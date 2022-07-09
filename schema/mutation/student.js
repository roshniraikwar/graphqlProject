const statusType = require('../typeDefs/status')
const { GraphQLInt, GraphQLString } = require('graphql');
const { studentSchema } = require('../../model')
const { allConstant } = require('../../constants')

module.exports.addStudent = {
    type: statusType,
    args: {
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
    },
    resolve: async (parent, args, context) => {
        const {
            rollNum,
            name,
            email,
            fatherName,
            phoneNumber,
            address,
            classNo,
        } = args
        const value = await context();
        await studentSchema.create({
            rollNum,
            name,
            email,
            fatherName,
            phoneNumber,
            address,
            classNo,
            teacherId: value.data._id
        })
        return { message: allConstant.STUDENT_CREATE_SUCCESSFULLY };
    }
}

module.exports.editStudent = {
    type: statusType,
    args: {
        id: { type: GraphQLString },
        rollNum: { type: GraphQLInt },
        name: { type: GraphQLString },
        fatherName: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        address: { type: GraphQLString },
        classNo: { type: GraphQLString },
        teacherId: { type: GraphQLString }
    },
    resolve: async (parent, args, context) => {
        const value = await context()
        const { id, name, fatherName, phoneNumber, address, classNo, teacherId } = args
        await studentSchema.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    name, fatherName, phoneNumber, address, classNo, teacherId
                }
            }
        )
        return { message: allConstant.STUDENT_UPDATED_SUCCESSFULLY };
    }
}

module.exports.deleteStudent = {
    type: statusType,
    args: {
        id: {
            type: GraphQLString
        },
    },
    resolve: async (parent, args, context) => {
        const value = await context()
        await studentSchema.findOneAndDelete({
            where: {
                id: args.id
            }
        })
        return { message: allConstant.STUDENT_DELETED_SUCCESSFULLY };
    }
}

