const express = require('express');
const modbus = require("modbus-serial");
var cors = require('cors');

const app = express();
app.use(cors({ origin: '*' }));

const port = 3001;

const client = new modbus();

const read = () => {
    client.readHoldingRegisters(5, 2)
        .then(console.log);
}

app.get('/', (req, res) => {
    const data = read();
    res.send(data);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
