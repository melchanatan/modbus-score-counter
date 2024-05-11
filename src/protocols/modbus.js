const express = require('express');
const ModbusRTU = require("modbus-serial");
var cors = require('cors');

const app = express();
app.use(cors({ origin: '*' }));

const port = 3001;
const usbPort = "/dev/tty.usbmodem1103"

const client = new ModbusRTU();

client.connectAsciiSerial(
    usbPort, 
    {
        baudRate: 115200,
    }, 
);

async function read () {
    // try {
        console.log("registry")

        registry = await client.readHoldingRegisters(5, 2)
        console.log(registry)

        // return registry
    // } catch (error) {
    //     return {
    //         status: 500,
    //         message: error.message
    //     }
    // }
}

app.get('/', async (req, res) => {
    const modbusRegistry = await read();

    if (modbusRegistry.status === 500) {
        res.sendStatus(500)
        return
    }

    return res.send({
        status: 200,
        message: modbusRegistry
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
