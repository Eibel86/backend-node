const express = require("express");
require('dotenv').config()
const app = express();
const cors = require("cors");
const path = require("path");
const { userRoutes, productRoutes } = require("./routes");



const port = process.env.PORT || 5000;

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));//configura el directorio uploads

const frontUrl = process.env.FRONT_URL || "http://localhost:5173"
const whiteList = [frontUrl]


app.use(cors({
    origin: whiteList
}))
// app.use((req, res, next) => {
//     console.log(`➡️ ${req.method} ${req.originalUrl}`);
//     next();
// });

// app.use("/uploads", express.static("uploads"));




app.use("/api/v1/user", userRoutes);

app.use("/api/v1/product", productRoutes);

// app.use("/admin", adminRoutes);


app.listen(port, () => {
    console.log(`server run on port: ${port}`)
})