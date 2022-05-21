// All express logic here
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
// This is because a method called graphqlHTTP exist in the express-graphql module and you are destructure with another method name that does not exist in the module

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listening');
});