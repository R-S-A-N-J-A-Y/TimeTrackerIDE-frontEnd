const fs = require("fs");
const cors = require("cors");
const express = require("express");
const app = express();

const { spawn } = require('child_process'); 

const port = 3000;

app.use(cors());
app.use(express.json());

function parseError(error){ //display error only not directory
  const index = error.indexOf(',');
  const cleanError = error.slice(index+1).trim();
  return cleanError;
}

//app starts here

app.post("/python", (req, res) => {
  
  const filePath = process.cwd() + '/test.py'; 
  fs.writeFileSync(filePath, req.body.code);

  const pythonProcess = spawn('python', [filePath]);

  //when code run successfully
  pythonProcess.stdout.on('data', (data) => {
    data = data.toString()
    res.json({ TrueorFalse: "true",message: "Success", answer: data.split('\n') }); // Send data from stdout
  });

  //when code gets error
  pythonProcess.stderr.on('data', (data) => {
    data = parseError(data.toString());
    const mes = "Error running Python script: \n" + data;
    res.json({ TrueorFalse: "false",message: mes.split('\n') });
  });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
