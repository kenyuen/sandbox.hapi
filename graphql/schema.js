const graphql = require('graphql');
const TaskType = require('./TaskType');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        task: {
            type: TaskType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                // logic for serving data
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})