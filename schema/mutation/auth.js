const teacherType = require('../typeDefs/teacher')
const statusType = require('../typeDefs/status')
const {GraphQLString} = require('graphql');
const bcrypt = require('bcrypt')
const {generateTokens} = require('../../helper')
const {teacherSchema} = require('../../model')
const {allConstant} = require('../../constants')

module.exports.login = {
    type: statusType,
    args: {
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        }
    },
    resolve: async (parent, args) => {
        const userData = await teacherSchema.findOne({email: args.email})
        let data = JSON.stringify(userData)
        const comparePassword = await bcrypt.compareSync(args.password, userData.password)
        const token = generateTokens.generateToken(userData)
        if (comparePassword) {
            return {message: allConstant.LOGIN, token: token, data: data};
        }
        return {message: allConstant.PASSWORD_NOT_MATCH}
    }
}
