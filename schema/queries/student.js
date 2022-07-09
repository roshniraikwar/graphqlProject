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
        limits: {
            type: GraphQLInt
        },
        search: {
            type: GraphQLString
        },
        filed: {
            type: GraphQLString
        },
        sortBy: {
            type: GraphQLString
        }
    },
    resolve: async (parent, args, context) => {
        const {
            currentPage,
            limits,
            search,
            filed,
            sortBy
        } = args
        const value = await context()
        const {offset, limit} = pagination.paginationData(currentPage, limits)
        let condition = {
            teacherId: value.data._id
        }
        if (search) {
            condition.$or = [
                {
                    name: {
                        $regex: new RegExp(search.trim(), 'i')
                    }
                }, {
                    email: {
                        $regex: new RegExp(search.trim(), 'i')
                    }
                },
            ]
        }
        let data = await studentSchema.find(condition)
        .limit(limit).skip(offset)
        .sort({[filed]: sortBy})
        .sort({createdAt:-1})
        return data;
    }
}

module.exports.studentListById = {
    type: new GraphQLList(studentType),
    args: {
        id: {
            type: GraphQLString
        },
    },
    resolve: async (parent, args, context) => {
        const value = await context()
        let data = await studentSchema.find({_id:args.id})
        return data;
    }
}
