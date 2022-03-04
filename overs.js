const mongoose = require('mongoose')

const matchSchema = mongoose.Schema({
    title: String,
    t1flag: String,
    t2flag: String,
    t1name: String,
    t2name: String,
    matchtstatus: String,
    overdetails1: Array,
    overdetails2: Array,
})

const MatchList = mongoose.model('matches', matchSchema);

module.exports = MatchList