// const dotenv = require('dotenv')
// const express = require('express')
// const cors = require('cors')
// const mongoose = require('mongoose')
// require('./mongo.js')
// const MatchList = require('./overs.js')

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import MatchList from "./overs.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 8001;
const conn_url = process.env.MONGOOSE_URL;

app.use(express.json())
app.use(cors())

mongoose
    .connect(conn_url
        // , {
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false,
        // }
    )
    .then(() => {
        console.log("Connection Successful");
    })
    .catch((err) => console.log(`no connection `));



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
        const overdata = await MatchList.findOne({ _id: req.params.matchid });
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
            const updateBall = await MatchList.findOneAndUpdate({ _id: matchid, "overdetails.overno": overno }, { $push: { "overdetails.$.balls": ball } })
            res.status(200).send(updateBall)
        }
        else {
            const newoverdata = await MatchList.findOneAndUpdate({ _id: matchid }, { $push: { overdetails: { "overno": overno, "balls": [ball] } } });
            res.status(200).send(newoverdata)
        }
        res.status(200).send(findmatch)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.listen(port, (req, res) => {
    console.log(`Listening on ${port}`);
})

