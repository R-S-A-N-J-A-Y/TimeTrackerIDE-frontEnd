const fs = require("fs");
const cors = require("cors");
const express = require("express");
const app = express();
const { spawn } = require('child_process');
const { type } = require("os");

const port = 8000;

app.use(cors());
app.use(express.json());

app.post("/python", (req, res) => {
  const filePath = process.cwd() + '/test.py';
  fs.writeFileSync(filePath, req.body.code);

  const pythonProcess = spawn('python', [filePath]);

  let responseSent = false;

  if (req.body.input) {
    pythonProcess.stdin.write(req.body.input);
  }
  pythonProcess.stdin.end();

  let stdoutData = '';
  let stderrData = '';

  // Handle stdout data
  pythonProcess.stdout.on('data', (data) => {
    stdoutData += data.toString();
  });

  // Handle stderr data
  pythonProcess.stderr.on('data', (data) => {
    stderrData += data.toString();
  });

  pythonProcess.on('close', () => {
    if (!responseSent) {
      if (stderrData) {
        res.json({ TrueorFalse: "false", message: "Error running Python script: \n" + stderrData });
      } 
      else {
        res.json({ TrueorFalse: "true", message: "Success", answer: stdoutData.split('\n') });
      }
      responseSent = true;
    }
  });

  pythonProcess.on('error', (err) => {
    if (!responseSent) {
      res.status(500).json({ TrueorFalse: "false", message: "Error starting Python process: " + err.message });
      responseSent = true;
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
