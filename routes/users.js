const express = require('express');
const ExpressErrors = require('../ExpressErrors');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const routes = express.Router();


routes.get('/', async (req, res, next) => {
    try{
        if (req.sessionID && req.session.user) {
            let userList = await User.getUsers();
            return res.status(200).json({userList})
        }else{
            throw new ExpressErrors(401, 'UNAUTHORIZED')
        }
    }catch(e){
        next(e)
    }
})

routes.post('/register', async (req, res, next) => {
    const { first_name, last_name, email, password } = req.body
    try{
        if (!first_name ||!last_name ||!email ||!password ) throw new ExpressErrors(401, 'MISSING DATA');
        let user = await User.register(req.body)
        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }
        // console.log(req.session,'session')
        res.status(200).json({user, session: req.session.user})
    }catch(e){
        next(e)
    }
})

routes.post('/login', async (req, res, next) => {
    const { email, password } = req.body
    // console.log(email, password, 'logging in')
    console.log(req.headers.origin)
    try{
        if (!email|| !password) throw new ExpressErrors(401, 'UNAUTHORIZED');
        let user = await User.login(req.body.email);
        if (!user) throw new ExpressErrors(401, 'UNAUTHORIZED2');
        const matches = bcrypt.compareSync(password, user.password);
        if (!matches) throw new ExpressErrors(403, 'FORBIDDEN');

        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }
        console.log(req.session,'session')
        res.status(200).json({user, session: req.session.user})
    }catch(e){
        next(e)
    }
})


routes.delete('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.status(400).send('Unable to log out')
        } else {
          res.send('Logout successful')
        }
      });
    } else {
      res.end()
    }
  })



module.exports = routes;