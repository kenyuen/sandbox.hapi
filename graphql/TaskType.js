const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        prioity: { type: GraphQLInt },
        status: { type: GraphQLString }
    })
});

module.exports = TaskType;