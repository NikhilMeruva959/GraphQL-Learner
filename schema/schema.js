//schema file communicates all the different types of data in our application over to graphql and tell how they are all related

const graphql = require('graphql');
const _ = require('lodash'); //helper function that helps us walk through data

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

//hardcoded for now
const user = [
    {id: '23', firstName: 'Bill', age:20},
    {id: '47', firstName: 'Daniela', age:21}
];

//represent user
const UserType = new GraphQLObjectType({
    name: 'User', //describes type were defining
    fields: {
        id: {type: GraphQLString}, //have to define type(ex. str, num, etc.)
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt}
    } //tells graphql all the user properties it has
});

//Root Query: lets you jump and find a User with ID 23
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve(parentValue, args){ //resolve() - looking for user, go into database and find actual data 
                return _.find(users, { id: args.id }); //using lodash
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});