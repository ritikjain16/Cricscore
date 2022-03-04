const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const app = express();
require('./mongo.js')
const MatchList = require('./overs.js')

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())


app.get('/getscore', async (req, res) => {
    try {
        const overdata = await MatchList.find();
        res.status(200).send(overdata)
    } catch (e) {
        res.status(400).send(e)
    }
})


app.get('/getmatch/:matchid', async (req, res) => {
    try {
        const overdata = await MatchList.findOne({_id:req.params.matchid});
        res.status(200).send(overdata)
    } catch (e) {
        res.status(400).send(e)
    }
})



app.post("/additem", async (req, res) => {
    try {
        const addMatch = await MatchList.create(req.body)
        res.status(200).send(addMatch)
    } catch (e) {
        res.status(400).send(e)
    }
})


app.post("/updatematch", async (req, res) => {
    const { overno, ball, matchid } = req.body;

    try {
        const findmatch = await MatchList.findOne({ _id: matchid, "overdetails.overno": overno });
        if (findmatch) {
            const updateBall = await MatchList.updateOne({ _id: matchid, "overdetails.overno": overno }, { $push: { "overdetails.$.balls": ball } })
            res.status(200).send(updateBall)
        }
        else {
            const newoverdata = await MatchList.updateOne({ _id: matchid }, { $push: { overdetails: { "overno": overno, "balls": [ball] } } });
            res.status(200).send(newoverdata)
        }
        res.status(200).send(findmatch)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.listen(PORT, (req, res) => {
    console.log(`Listening on ${PORT}`);
})

