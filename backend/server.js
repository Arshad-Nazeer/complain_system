const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();


// ROUTES
const complaintRoutes = require(
    "./routes/complaintRoutes"
);

const authRoutes = require(
    "./routes/authRoutes"
);

const aiRoutes = require(
    "./routes/aiRoutes"
);


const app = express();


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// API ROUTES
app.use(
    "/api/complaints",
    complaintRoutes
);

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/ai",
    aiRoutes
);


// TEST ROUTE
app.get("/", (req, res) => {

    res.send(
        "Complaint Management Backend Running"
    );

});


// DATABASE
mongoose
    .connect(process.env.MONGO_URI)
    .then(() =>
        console.log("MongoDB Connected")
    )
    .catch((err) =>
        console.log(err)
    );


const PORT =
    process.env.PORT || 7300;


app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});