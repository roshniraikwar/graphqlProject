require('dotenv').config()
const express = require('express');
const app = express();
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema')
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose");
const http = require('http')
app.use(express.json())

const context = (req) => {
    const token = req.headers.authorization;
    const data = jwt.verify(token, process.env.SCREATEKEY)
    req.userData = data
    return req.userData
}

(async () => {
    try {
        mongoose.connect(process.env.DB_URL, {});
        console.log('Successfully connected database')
        app.use('/graphql', graphqlHTTP(async req => ({
            schema,
            graphiql: true,
            context: () => context(req)
        })))
        const server = http.createServer(app);
        const port = process.env.PORT || 8000;
        server.listen(port).on('listening', () => console.log(`App is starting on port: ${port}`)).on('error', (err) => console.log(`An error occured while starting server`, err))
    } catch (error) {
        console.log(error)
        console.log(`An error is happening with DB URL connection string`)
        process.exit(1);
    };
})();
