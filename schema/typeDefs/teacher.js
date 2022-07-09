const graphql = require('graphql')
const {GraphQLObjectType, GraphQLInt, GraphQLString} = graphql

const teacherType = new GraphQLObjectType({
    name: 'teacher',
    fields: () => (
        {
            id: {
                type: GraphQLInt
            },
            name: {
                type: GraphQLString
            },
            email: {
                type: GraphQLString
            },
            phoneNumber: {
                type: GraphQLString
            },
            address: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString
            }
        }
    )
})

module.exports = teacherType
