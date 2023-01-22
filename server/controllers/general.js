import User from "../models/user.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";

//req gets you params and the body and res sends information to frontend or whoever calls the API
export const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user); 
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const getDashboardStats = async (req, res) => {
    try{
        //the following values are hardcoded
        const currentMonth = "November";
        const currentYear = 2021;
        const currentDay = "2021-11-15";

        //Recent Transactions
        const transactions = await Transaction.find().limit(50).sort({
            createdOn: -1
        });

        //Overall Stats
        const overallStats = await OverallStat.find({year: currentYear});

        const {
            totalCustomers,
            yearlySalesTotal,
            yearlyTotalSoldUnits,
            monthlyData,
            dailyData,
            salesByCategory
        } = overallStats[0];

        const thisMonthStats = monthlyData.find(({ month }) => {
            return month === currentMonth;
        });
        const todayStats = dailyData.find(({ date }) => {
            return date === currentDay;
        });

        res.status(200).json({
            totalCustomers,
            yearlySalesTotal,
            yearlyTotalSoldUnits,
            monthlyData,
            dailyData,
            salesByCategory,
            thisMonthStats,
            todayStats,
            transactions
        })
        }
    catch(error){
        res.status(404).json({message: error.message});
    }
}