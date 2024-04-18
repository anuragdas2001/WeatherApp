const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const port = 8000;
app.use(cors());
app.use("/", routes);
const httpServer = require("http").createServer(app);

const options = {
  cors: {
    origin: "*",
  },
};

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
