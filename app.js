const express = require('express');
const vm = require('vm');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000 || process.env.PORT;

app.use(cors());

app.use(bodyParser.text());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.post('/runcode', (req, res) => {
    const code = req.body;

    const sandbox = { console, require };
    let output = '';

    // Redirect stdout to capture it
    sandbox.console.log = (data) => {
        output += data;
    };

    vm.createContext(sandbox);

    try {
        vm.runInContext(code, sandbox);
        res.send(output);
    } catch (error) {
        res.status(500).send("error: "+error.message);
    }
});



module.exports = app;