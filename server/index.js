const fs = require("fs");
const cors = require("cors");
const express = require("express");
const app = express();
const { spawn } = require('child_process');
const { resolve } = require("path");
const { rejects } = require("assert");

const port = 8000; //port Number

app.use(cors());
app.use(express.json());

app.post("/python/editor1", async (req, res) => {
  handleRequest(req, res, 'editor1');
});

app.post("/python/editor2", async (req, res) => {
  handleRequest(req, res, 'editor2');
});

const handleRequest = async (req, res, editor) => {

  const filePath = process.cwd() + `/test_${editor}.py`;
  fs.writeFileSync(filePath, req.body.code);

  const inputs = [req.body.input1];

  if(req.body.input2){ //The Python file only execute for testcase 2 when the input is given.
    inputs.push(req.body.input2);
  }

  const results = {};
  const iteration = 4;

  for (let i = 0; i < inputs.length; i++) {
    const result = await runPythonScriptMultipleTime(filePath, inputs[i], iteration);
    results[`result${i + 1}`] = result;
  }

  res.json(results);
};

const runPythonScriptMultipleTime = (filePath, inputs, iteration) => {
  return new Promise(async(resolve, reject) => {
    let Total = [];
    let result;

    for(let i=0;i<iteration; i++){
      result = await runPythonScript(filePath, inputs);
      Total.push(result.ExecutionTime);
    }
    result.ExecutionTime = Math.min(...Total);
    console.log(Total);
    resolve(result);
  })
}

const runPythonScript = (filePath, input) => {
  return new Promise((resolve, reject) => {

    const warmUp = spawn('python', ['-c', '']);

    warmUp.on('close', () =>{
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
          resolve({ TrueorFalse: "false", message: "Error running (Input) Python script: \n" + stderrData });
        } 
        else{
          resolve({ TrueorFalse: "true", message: "Success", answer: stdoutData.split('\n'), ExecutionTime: execution } );
        }
      });

      pythonProcess.on('error', (err) => {
        reject({ TrueorFalse: "false", message: "Error starting Python process: " + err.message });
      });
    })
  });
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
