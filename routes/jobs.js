const express = require('express');
const ExpressErrors = require('../ExpressErrors');
const routes = express.Router();
const Job = require('../models/job')

routes.get('/free', async (req, res, next) => {
    req.session.viewCount = req.session.viewCount || 0 ;
    let viewCount = req.session.viewCount += 1 ;
    console.log(req.sessionID,'sessionID');
    console.log(req.session);
    console.log(req.headers.origin,'origin');
    res.status(200).json({viewCount});
})

routes.get('/', async (req, res, next) => {
    try{
        if(req.sessionID && req.session.user){
            let results = await Job.getAll()
            res.status(200).json({results})
        }else{
            throw new ExpressErrors(401, 'YOU DONT HAVE ACCESS to jobs')
        }
    }catch(e){
        next(e)
    }
    
  
})

module.exports = routes;