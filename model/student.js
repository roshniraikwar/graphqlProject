const {Schema, model} = require('mongoose')

const studentSchema = new Schema({
    rollNum: {
        type: Schema.Types.String,
        required: true
    },
    name: {
        type: Schema.Types.String,
        trim: true
    },
    email: {
        type: Schema.Types.String
    },
    fatherName: {
        type: Schema.Types.String
    },
    phoneNumber: {
        type: Schema.Types.Number
    },
    address: {
        type: Schema.Types.String
    },
    classNo: {
        type: Schema.Types.String
    },
    teacherId: {
        type: Schema.Types.String,
        ref: 'teacher'
    }
}, {
    timestamps: true
},)

module.exports = model('student', studentSchema, 'student')
