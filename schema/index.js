const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLSchema,
} = graphql
const {studentList} = require('./queries/student')
const {addStudent,editStudent,deleteStudent} = require('./mutation/student')
const {addteacher} = require('./mutation/teacher')
const {login} = require('./mutation/auth')


const RootQuery = new GraphQLObjectType({
    name:'query',
    fields:{
      STUDENTLISTS:studentList,
    }
})

const Mutation = new GraphQLObjectType({
    name: 'mutation',
    fields:{
     ADDTEACHERS:addteacher,
     LOGIN:login,
     ADDSTUDENTS:addStudent,
     EDITSTUDENT:editStudent,
     DELETESTUDENT:deleteStudent
    }
})

module.exports = new GraphQLSchema({query: RootQuery, mutation:Mutation})