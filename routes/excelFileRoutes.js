const express = require("express");
const router = express.Router();

// get the controllers for our router
const {
    getExcelFiles,
    addExcelFile,
} = require("../controllers/excelFileControllers");


const multer = require("multer");

// multer para i save ang imported csv file sa storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./upload");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// routers
// to get all the data in the db
router.get("/", getExcelFiles);

// to add data in the db
router.post("/", upload.single("csvFile"), addExcelFile);


module.exports = router;
