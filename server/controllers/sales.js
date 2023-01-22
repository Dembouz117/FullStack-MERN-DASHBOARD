import OverallStat from "../models/OverallStat.js";

export const getSales = async (req,res) => {
    try{
        const overallStatistics = await OverallStat.find();
        res.status(200).json(overallStatistics[0]);
    }
    catch{
        res.status(404).json({message: error.message});
    } 
}