require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const excelFileRoutes = require("./routes/excelFileRoutes");
const cors = require("cors");

const app = express();
//middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
app.use("/api/file", excelFileRoutes);

//connection to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        // for listening to requests
        app.listen(process.env.PORT, () => {
            console.log("listening on port " + process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
