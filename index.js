// load env file
require('dotenv').config()
// import express 
const express = require('express')
const router = require('./routes/routes')
require('./db/connection')
// create server using express
const Student = express()
// convert all incoming json data to js data
Student.use(express.json())
Student.use(router)

const PORT = 4000 || process.env.PORT
Student.listen(PORT, () => {
    console.log(`________Student server started at ${PORT}___`);
})