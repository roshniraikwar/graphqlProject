const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLSchema,
} = graphql
const { studentList, studentListById } = require('./queries/student')
const { addStudent, editStudent, deleteStudent } = require('./mutation/student')
const { addTeacher } = require('./mutation/teacher')
const { login } = require('./mutation/auth')

const RootQuery = new GraphQLObjectType({
    name: 'query',
    fields: {
        STUDENTLISTS: studentList,
        STUDENTLISTBYID: studentListById
    }
})

const Mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        ADDTEACHERS: addTeacher,
        LOGIN: login,
        ADDSTUDENTS: addStudent,
        EDITSTUDENT: editStudent,
        DELETESTUDENT: deleteStudent
    }
})

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })