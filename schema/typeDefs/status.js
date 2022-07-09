const graphql = require('graphql')
const {GraphQLObjectType, GraphQLInt, GraphQLString} = graphql

const statusType = new GraphQLObjectType({
    name: 'statusType',
    fields: () => (
        {
            message: {
                type: GraphQLString
            },
            token: {
                type: GraphQLString
            },
            data: {
                type: GraphQLString
            }
        }
    )
})

module.exports = statusType
