const fs = require("fs");
const cors = require("cors");
const express = require("express");
const app = express();
const { spawn } = require('child_process');
const { type } = require("os");

const port = 8000; //port Number

app.use(cors());
app.use(express.json());

app.post("/python", (req, res) => {
  const filePath = process.cwd() + '/test.py';
  fs.writeFileSync(filePath, req.body.code);

  const pythonProcess = spawn('python', [filePath]);

  const startTime = process.hrtime();

  let responseSent = false;

  if (req.body.input1) {
    pythonProcess.stdin.write(req.body.input1);
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
    const endTime = process.hrtime(startTime);
    const execution = (endTime[0] * 1000 + endTime[1] / 1e6)/1000;
    if (!responseSent) {
      if (stderrData) {
        res.json({ TrueorFalse: "false", message: "Error running Python script: \n" + stderrData });
      } 
      else {
        res.json({ TrueorFalse: "true", message: "Success", answer: stdoutData.split('\n'), ExecutionTime : execution });
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
