import mongoose from "mongoose";

const matchSchema = mongoose.Schema({
    title: String,
    t1flag: String,
    t2flag: String,
    t1name: String,
    t2name: String,
    matchtstatus: String,
    overdetails: Array
})

const MatchList = mongoose.model('matches', matchSchema);

export default MatchList