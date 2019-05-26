
const express = require('express')

const graphqlHTTP = require('express-graphql')
const app = express()


const schema = require('./schema/schema');

app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true
})); //handle

app.listen(4000, ()=>{
    console.log('Listening ffor request on port 4000.')
})