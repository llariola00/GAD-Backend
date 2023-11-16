const mongoose = require('mongoose')

const Schema = mongoose.Schema

const excelFileSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    sex: {
        type: String,
        required: true
    },
    degreeProgram: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    yearLevel: {
        type: String,
        required: false
    },
    campus: {
        type: String,
        required: false
    },
    college: {
        type: String,
        required: false
    },
}, {timestamps: true})

module.exports = mongoose.model('ExcelFile', excelFileSchema)