const express = require("express");
require("dotenv/config");

const productRoutes = require("./routes/productRoutes");
const categoryRotes = require("./routes/categoryRoutes");

const PORT = process.env.PORT;
const pre = process.env.API_URL;
const app = express();
app.use(express.json());

//Connect Database
const connectDB = require("./config/db");
connectDB();

app.use(`${pre}/products`, productRoutes);
app.use(`${pre}/categories`, categoryRotes);

// app.get(`${pre}/products`, (req, res) => {
//   res.json({
//     id: 2,
//     name: "Two Product",
//   });
// });

// app.post(`${pre}/product`, (req, res) => {
//   const newProduct = req.body;
//   res.json(newProduct);
// });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
