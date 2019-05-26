const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
} = graphql

var books = [
    {name: 'jdkljdsa', genre: 'Fan', id: '1'},
    {name: 'jdkljdsdddda', genre: 'Fan', id: '2'},
    {name: 'jdkldsasaas', genre: 'Fan', id: '3'},
];

//First object type
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:() =>({
        id: { type: GraphQLID }, 
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});


//Define query - How we can jump into the graph./
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args:{
                id: {type: GraphQLString}
            },
            resolve(parent, args){
                return _.find(books, {id: args.id});
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
});