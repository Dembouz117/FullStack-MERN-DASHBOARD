  import express from 'express';
  import bodyParser from 'body-parser'; 
  import mongoose from 'mongoose';
  import cors from 'cors';
  import dotenv from 'dotenv';
  //For protecting APIs
  import helmet from 'helmet';
  //For logging API calls
  import morgan from 'morgan';
  
  import clientRoutes from "./routes/client.js";
  import generalRoutes from "./routes/general.js";
  import managementRoutes from "./routes/management.js";
  import salesRoutes from "./routes/sales.js";

  
  
  //Data imports
  import User from "./models/user.js";
  import Product from "./models/Product.js";
  import ProductStat from "./models/ProductStat.js";
  import OverallStat from './models/OverallStat.js';
  import Transaction from "./models/Transaction.js";
  import AffiliateStat from "./models/AffiliateStat.js";
  import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat } from "./data/index.js";


  
 
//   Configuration

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());

//Allows us to make cross-origin sharing requests. Need it to make API calls from another server
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
//Find out what this is later
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//ROUTES

app.use("/client", clientRoutes);
//General gets both the user's profile and the dashboard
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

//MONGOOSE SETUP

//process.env allows you to access env variables in the .env file. However, it may not always exist. So add a backup port
//Later learn how to convert this into the async await syntax
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => {
    app.listen(PORT, () => console.log(`Server PORT : ${PORT}`));

    //Only add data one time
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
}).catch( error => console.log(`${error} did not connect.`));