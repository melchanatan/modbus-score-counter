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
const zeroPad = (num, places) => String(num).padStart(places, '0')

async function read () {
    try {
        const registery = await client.readHoldingRegisters(0, 1)
        console.log(registery)
        const ActiveButtons = []

        const binaryCode = (registery.data >>> 0).toString(2)
        const paddedBinaryCode = zeroPad(binaryCode, 4)
        console.log(paddedBinaryCode)

        for (let i = 0; i < paddedBinaryCode.length; i++) {
            if (paddedBinaryCode[i] === '0') {
                ActiveButtons.push(i)
            }
        }

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
