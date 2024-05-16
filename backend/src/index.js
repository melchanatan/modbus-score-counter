const express = require('express');
const ModbusRTU = require("modbus-serial");
var cors = require('cors');

const app = express();
app.use(cors({ origin: '*' }));

const port = 3001;
const usbPort = 'COM8';

const client = new ModbusRTU();
client.setID(0x15);

client.connectRTUBuffered(
    usbPort,
    {
        baudRate: 19200,
        dataBits: 8,
        parity: "even",
        stopBits: 1,
        startOfSlaveFrameChar: 0x47
    },
);
client.setTimeout(2000);

async function read () {
    try {
        const registery = await client.readHoldingRegisters(0, 1)
        console.log(registery)
        const ActiveButtons = []

        // Get index of 1s
        registery.data.forEach((element, index) => {
            if (element == 1) {
                ActiveButtons.push(index)
            }
        });

        return ActiveButtons 
    } catch (error) {
        console.log(error)
        return error
    }
}

app.get('/read', async (req, res) => {
    const modbusRegistry = await read();
    console.log(modbusRegistry)
    // if (modbusRegistry.status === 500) {
    //     res.sendStatus(500)
    //     return
    // }

    return res.send({
        status: 200,
        message: modbusRegistry
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
