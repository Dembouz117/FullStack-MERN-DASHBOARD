// import mongoose from "mongoose";
import User from "../models/user.js";
import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

export const getAdmins = async (req,res) => {
    try{
        const admins = await User.find({role:"admin"}).select("-password");
        res.status(200).json(admins);
    }
    catch{
        res.status(404).json({ message: error.message });
    }
}

export const getUserPerformance = async (req,res) => {
    try{
        const { id } = req.params;

        //Read up aggregate pipelines. This is like SQL joins, Group By and Aggregate
        //convert the userId to the right format first below

        //The local table is User because that is where the aggregate function is called from
        //$unwind flattens your array
        const userWithStats = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) }},
            {
                $lookup: {
                    from: "affiliatestats",
                    localField: "_id",
                    foreignField: "userId",
                    as: "affiliateStats"
                }
            },
            { $unwind: "$affiliateStats"}
        ]);

        const saleTransactions = await Promise.all(
            userWithStats[0].affiliateStats.affiliateSales.map((id) => {
                return Transaction.findById(id)
            })
        );

        const filteredSaleTransactions = saleTransactions.filter(
            transaction => transaction !== null
        );

        res.status(200).json({
            user: userWithStats[0],
            sales: filteredSaleTransactions
        });
    }
    catch{
        res.status(404).json({ message: error.message });
    }
}

