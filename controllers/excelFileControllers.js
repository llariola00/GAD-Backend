const ExcelFile = require("../models/excelModels");
const csv = require("csvtojson");
const mongoose = require("mongoose");

// Get all data in the DB
const getExcelFiles = async (req, res) => {
    const excelFiles = await ExcelFile.find({}).sort({ createdAt: -1 });
    res.status(200).json(excelFiles);
};

// To add data in the DB

const addExcelFile = async (req, res) => {
    try {
        // Extract the "eventName" from the form data
        const eventName = req.body.eventName;  // Make sure this matches the correct field name in your form

        // Check that the "eventName" is not empty or undefined
        if (!eventName) {
            return res.status(400).json({ error: "Event name is required" });
        }

        // Parse the CSV file into a JSON array
        const jsonArray = await csv().fromFile(req.file.path);

        // Modify each object in the JSON array to include the "eventName"
        const jsonArrayWithEventName = jsonArray.map(item => ({
            ...item,
            eventName: eventName,
        }));

        // Insert the modified JSON data into the database
        await ExcelFile.insertMany(jsonArrayWithEventName);

        // Redirect to the homepage on success
        res.redirect("/"); // Replace '/' with the URL of your homepage
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getExcelFiles,
    addExcelFile,
};
