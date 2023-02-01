const express = require('express');
const cors = require('cors');
const session = require('./session');
const ExpressErrors = require('./ExpressErrors')
const jobRoutes = require('./routes/jobs');
const userRoutes = require('./routes/users')

const app = express();

app.use(cors({ origin:'http://127.0.0.1:5500', credentials: true }))
app.use(session)
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use('/jobs', jobRoutes);
app.use('/users', userRoutes)


app.use((req, res, next) => {
    next(new ExpressErrors(404, 'PAGE NOT FOUND'))
})
app.use((error, req, res, next) => {
    let status = error.status || 500 ;
    let message = error.message;
    console.log(status, message)
    res.status(status).send({ERROR: {status, message}})
})

module.exports = app;



