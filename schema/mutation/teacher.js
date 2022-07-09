const statusType = require('../typeDefs/status')
const {GraphQLString} = require('graphql');
const bcrypt = require('bcrypt')
const {teacherSchema} = require('../../model');
const { allConstant } = require('../../constants');

module.exports.addTeacher = {
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
            return {message:allConstant.EMAIL_IS_ALREADY_EXIST};
        }
        await teacherSchema.create({
            name,
            email,
            phoneNumber,
            address,
            password: hashPassword
        })
        return {message:allConstant.CREATED_SUCCESSFULLY};
    }
}
