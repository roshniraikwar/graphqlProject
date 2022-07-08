const {GraphQLList, GraphQLInt, GraphQLObjectType, GraphQLString} = require('graphql')
const {studentSchema} = require('../../model')
const studentType = require('../typeDefs/student')
const {pagination} = require('../../helper')

module.exports.studentList = {
    type: new GraphQLList(studentType),
    args: {
        currentPage: {
            type: GraphQLInt
        },
        limit: {
            type: GraphQLInt
        },
        search: {
            type: GraphQLString
        }
    },
    resolve: async (parent, args, context) => {
        const value = await context()
        console.log(value,"value.....");
        const {offset, limit} = pagination.paginationData(args.currentPage, args.limit)
        console.log(offset, limit, ",.,.,.,.,.,.,..,");
        let data = await studentSchema.find({teacherId: value.data._id}).limit(limit).skip(offset)
        return data;
    }
}
