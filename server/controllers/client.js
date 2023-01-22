import Product from '../models/Product.js';
import ProductStat from '../models/ProductStat.js';
import User from "../models/user.js";
import Transaction from "../models/Transaction.js";
// @ts-ignore
import isoConversion from '../data/isoConversion.js';

export const getProducts = async (req, res) => {
    try{
        //finds all that matches the Product schema and the mongoose model you created. You can find singular by using methods such as
        //.findById() or like line 12. find({*some requirement*})
        ///For so/////////////
        const products = await Product.find();
        //Need this when processing iterable promises
        const productsWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id
                })
                return {
                    ...product._doc,
                    stat,
                }
            })
        )
        res.status(200).json(productsWithStats); 
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const getCustomers = async (req, res) => {
    try{
        const customers = await User.find({
            role: "user"
        }).select("-password")
        res.status(200).json(customers);
    }catch{
        res.status(404).json({message: error.message});
    }
}

export const getTransactions = async (req, res) => {
    try{
        //We are doing the following because we are doing SS pagination
        //We are grabbing it from the frontend
        //sort that MUI has should look like this: {"field": "userId", "sort": "desc"}. We getting this from Material UI
        const { page = 1, pageSize = 20, sort = null, search = ""} = req.query;

        //formatted sort should look like { userId: -1 }. This is what MongoDB is gonna read
        const generateSort = () => {
            //Do this because frontend sends it as a string.
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                //I'm guessing this means sort is an obj containing "userId" : 1 or -1. You need [] because you are accessing the value.
                //Because sortParsed.field is "userId"
                [sortParsed.field]: sortParsed.sort = "asc" ? 1 : -1
            }

            return sortFormatted;
        }


        const sortFormatted = Boolean(sort) ? generateSort() : {};
        const transactions = await Transaction.find({
            //Performs logical or expression. The list contains different expressions in {}. So long as at least one expression is satisfied,
            //the data will be pulled from the database.
            $or: [
                //Keep in mind, some IDs you need to use the mongoose object id for it to work
                {cost: { $regex: new RegExp(search, "i")}},
                {userId: { $regex: new RegExp(search, "i")}}
            ]
        }).sort(sortFormatted)
        .skip(page * pageSize)
        .limit(pageSize);

        //This is to get the total amount of queries
        //Test if can do name: {$regex: new RegExp(search, "i")}
        const total = await Transaction.countDocuments({
            name: { $regex: search, $options: "i"}
        })
        //don't forget add status(200) instead of just res()
        res.status(200).json(({
            transactions,
            total
        }));
    }catch{
        res.status(404).json({message: error.message});
    }
}

//Note, if you make an error in getTransactions, you may affect the other hooks too. For example, if you write res.status({transactions,total})
//the promise will never resolve and then you will be unable to query via the other hooks too
//No clear error will show up here to tell you about your mistake

export const getGeography = async (req, res) => {
    try {
      const users = await User.find();
  
      const mappedLocations = users.reduce((acc, { country }) => {
        const countryISO3 = isoConversion(country);
        if (acc[countryISO3] === undefined) {
          acc[countryISO3] = 1;
        }else{
            acc[countryISO3] += 1;
        }
       
        return acc;
      }, {});
  
      const formattedLocations = Object.entries(mappedLocations).map(
        ([country, count]) => {
          return { id: country, value: count };
        }
      );
  
      res.status(200).json(formattedLocations);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

