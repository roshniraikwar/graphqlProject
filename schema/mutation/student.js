const studentType = require('../typeDefs/student')
const statusType = require('../typeDefs/status')
const {GraphQLInt, GraphQLString} = require('graphql');
const {studentSchema} = require('../../model')

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
            type : GraphQLString
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
        const data = await studentSchema.create({rollNum,
            name,
            email,
            fatherName,
            phoneNumber,
            address,
            classNo,
            teacherId:value.data._id})
        return {message:"student created successfully"};
    }
}

module.exports.editStudent = {
    type: statusType,
    args: {
        id:{type:GraphQLString},
        rollNum:{type:GraphQLInt},
        name: { type: GraphQLString },
        fatherName:{ type: GraphQLString },
        phoneNumber:{type:GraphQLString},
        address:{type:GraphQLString},
        classNo:{type:GraphQLString},
        teacherId:{type:GraphQLString}
    },
    resolve:async(parent, args, context)=> {
        const value = await context()
        console.log(args);
        const {id,name, fatherName, phoneNumber, address, classNo, teacherId} = args
        const data =await studentSchema.findByIdAndUpdate(
           {
            _id:id
           },
           {
            $set:{
                name, fatherName, phoneNumber, address, classNo, teacherId
            }
           }
        )
        return {message:"student updated successfully"};
    }
}

module.exports.deleteStudent= {
    type: statusType,
    args: {
        id: {
            type: GraphQLString
        },
    },
    resolve:async(parent, args,context)=> {
        const value = await context()
        const data =await studentSchema.findOneAndDelete({
            where: {
                id: args.id
            }
        })
        return {message:"student deleted successfully"};
    }
}

