const express = require("express");
const mongoose = require("mongoose");
const app = express();

const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");

const swaggerDefinition = yaml.load("./swagger.yaml");
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

//import product routes
const hairRoutes = require("./routes/hair");
const bodyTopRoutes = require("./routes/bodyTop");
const bodyBottomRoutes = require("./routes/bodyBottom");
const shoeRoutes = require("./routes/shoe");

require("dotenv-flow").config();
const PORT = process.env.PORT || 4001;
// Is Server running?
app.listen(PORT, function () {
  console.log("The Server is running on port: " + PORT);
});

//Parse request as JSON
app.use(express.json());

//routes (get,post,put,delete (CRUD))
app.use("/api/hair", hairRoutes);
app.use("/api/bodyTop", bodyTopRoutes);
app.use("/api/bodyBottom", bodyBottomRoutes);
app.use("/api/shoe", shoeRoutes);

mongoose
  .connect(process.env.DBHOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((error) => console.log("Error connecting to MongoDB:" + error));

mongoose.connection.once("open", () =>
  console.log("Connected succesfully to MongoDB")
);

module.exports = app;
