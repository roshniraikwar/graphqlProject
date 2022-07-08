const { Schema, model } = require('mongoose')

const teacherSchema = new Schema(
    {
        name: {
            type: Schema.Types.String,
            trim: true,
        },
        email: {
            type: Schema.Types.String,
        },
        phoneNumber: {
            type: Schema.Types.Number,
        },
        address: {
            type: Schema.Types.String,
        },
        password: {
            type: Schema.Types.String,
        },
    },
    { timestamps: true },
)

module.exports = model('teacher', teacherSchema, 'teacher')
