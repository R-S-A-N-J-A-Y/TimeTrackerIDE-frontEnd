const fs = require("fs");
const cors = require("cors");
const express = require("express");
const app = express();
const { spawn } = require('child_process');

const port = 8000; //port Number

app.use(cors());
app.use(express.json());

app.post("/python", async (req, res) => {
  const filePath = process.cwd() + '/test.py';
  fs.writeFileSync(filePath, req.body.code);

  const inputs = [req.body.input1, req.body.input2];
  const results = {};

  for (let i = 0; i < inputs.length; i++) {
    const result = await runPythonScript(filePath, inputs[i]);
    results[`result${i + 1}`] = result;
  }

  res.json(results);
});

const runPythonScript = (filePath, input) => {
  return new Promise((resolve, reject) => {

    const pythonProcess = spawn('python', [filePath]);

    const startTime = process.hrtime();

    if(input){
      pythonProcess.stdin.write(input);
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
      const execution = (endTime[0] * 1000 + endTime[1] / 1e6) / 1000;
      if (stderrData){
        resolve({ TrueorFalse: "false", message: "Error running Python script: \n" + stderrData });
      } 
      else{
        resolve({ TrueorFalse: "true", message: "Success", answer: stdoutData.split('\n'), ExecutionTime: execution });
      }
    });

    pythonProcess.on('error', (err) => {
      reject({ TrueorFalse: "false", message: "Error starting Python process: " + err.message });
    });
  });
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
