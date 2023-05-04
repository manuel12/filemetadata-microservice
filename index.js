const express = require("express");
const cors = require("cors");
const formidable = require("formidable");
require("dotenv").config();

const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err != null) {
      return res.status(400).json({ message: err.message });
    }

    const respObj = {
      name: files.upfile.originalFilename,
      type: files.upfile.mimetype,
      size: files.upfile.size,
    };

    res.json(respObj);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
