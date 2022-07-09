const graphql = require('graphql')
const {GraphQLObjectType, GraphQLInt, GraphQLString} = graphql

const studentType = new GraphQLObjectType({
    name: 'student',
    fields: () => (
        {
            id: {
                type: GraphQLString
            },
            rollNum: {
                type: GraphQLInt
            },
            name: {
                type: GraphQLString
            },
            email: {
                type: GraphQLString
            },
            fatherName: {
                type: GraphQLString
            },
            phoneNumber: {
                type: GraphQLString
            },
            address: {
                type: GraphQLString
            },
            classNo: {
                type: GraphQLString
            },
            teacherId: {
                type: GraphQLString
            }
        }
    )
})

module.exports = studentType
