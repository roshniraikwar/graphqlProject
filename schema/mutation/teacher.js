const teacherType = require('../typeDefs/teacher')
const statusType = require('../typeDefs/status')
const {GraphQLInt, GraphQLString} = require('graphql');
const bcrypt = require('bcrypt')
const {teacherSchema} = require('../../model')

module.exports.addteacher = {
    type: statusType,
    args: {
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
    },
    resolve: async (parent, args, context) => {
        const {
            name,
            email,
            phoneNumber,
            address,
            password
        } = args
        let salt = await bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const data = await teacherSchema.findOne({email})
        if (data) {
            return {message: "email is already exist"};
        }
        await teacherSchema.create({
            name,
            email,
            phoneNumber,
            address,
            password: hashPassword
        })
        return {message: "created successfully"};
    }
}
