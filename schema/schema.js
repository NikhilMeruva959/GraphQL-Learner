//schema file communicates all the different types of data in our application over to graphql and tell how they are all related

const graphql = require('graphql');
//const _ = require('lodash'); //helper function that helps us walk through data
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = graphql;

//hardcoded for now
// const userm = [
//     {id: '23', firstName: 'Bill', age:20},
//     {id: '47', firstName: 'Daniela', age:21}
// ];

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: ()=> ({  //()=> ( ... ) because CompanyType and UserType rely on each other (Javscript Closure Scopes)
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType), //GraphQLList tell GraphQL when you go from company -> user (going to have multiple users with that specific company)
            resolve(parentValue, args){ //parentValue is instance of the company
                return axios.get(`http:localhost:3000/companies/${parentValue.id}/users`).then(resp => resp.data);

            }
        }
    })
});
// we treat associations between types exactly as another field

//represent user
const UserType = new GraphQLObjectType({
    name: 'User', //describes type were defining
    fields: ()=> ({
        id: {type: GraphQLString}, //have to define type(ex. str, num, etc.)
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt},
        company: {
            type: CompanyType, //asccioated company but getting id( using resolve method to populate new data)
            resolve(parentValue, args){
                //console.log(parentValue, args);
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`).then(res => res.data);
            }
        }
    }) //tells graphql all the user properties it has
});

//Root Query: lets you jump and find a User with ID 23
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve(parentValue, args){ //resolve() - looking for user, go into database and find actual data 
                // return _.find(userm, { id: args.id }); //using lodash to return raw javscript obj
                return axios.get(`http:localhost:3000/user/${args.id}`).then(resp => resp.data);
                /*
                    When we do axios: .then(response => console.log(response)) // { data: { firstName: 'bill' } }
                    instead do: .then(resp => resp.data); //when you make the request, take the resp and only return data
                */
            }
        },
        company: {
            type: CompanyType,
            args: {id: {type: GraphQLString}}, 
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/companies/${args.id}`).then(resp => resp.data); //only returning data and not the full resp obj
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});