const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
} = graphql

var books = [
    {name: 'Book-one', genre: 'Fan', id: '1', authorId:'1'},
    {name: 'Book-two', genre: 'Fan', id: '2', authorId:'2'},
    {name: 'Book-three', genre: 'sci', id: '3', authorId:'3'},
    {name: 'Book-four', genre: 'Fan', id: '4', authorId:'2'},
    {name: 'Book-five', genre: 'Fan', id: '5', authorId:'3'},
    {name: 'Book-six', genre: 'Fan', id: '6', authorId:'3'},
];


var authors = [
    {name: 'Idan', age: 17, id: '1'},
    {name: 'Guy', age: 15, id: '2'},
    {name: 'Zohar', age: 11, id: '3'},
];

//First object type
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:() =>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.authorId});
            }
        }
    })
});


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:() =>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args){
                console.log(parent);
                return _.filter(books, {authorId: parent.id});
            }
        }
    })
});


//Define query - How we can jump into the graph./
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args:{
                id: {type: GraphQLID}
            },
            resolve(parent, args){
                return _.find(books, {id: args.id});
            }
        },
        author:{
            type: AuthorType,
            args:{
                id: {type: GraphQLID}
            },
            resolve(parent, args){
                return _.find(authors, {id: args.id});
            }
        },
        books:{
            type: GraphQLList(BookType),
            resolve(parent, arge){
                return books;
            }
        },
        authors:{
            type: GraphQLList(AuthorType),
            resolve(parent, args){
                return authors;
            }
        }

    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
});
