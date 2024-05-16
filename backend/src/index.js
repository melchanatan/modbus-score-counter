const express = require('express');
const ModbusRTU = require("modbus-serial");
var cors = require('cors');

const app = express();
app.use(cors({ origin: '*' }));

const port = 3001;
const usbPort = 'COM9';

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
        const data = await client.readHoldingRegisters(0, 1)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
    
}

function write() {
    // write the values 0, 0xffff to registers starting at address 5
    // on device number 1.
    client.writeRegisters(4, [0 , 0x000])
        .then(read)
}

app.get('/read', async (req, res) => {
    const modbusRegistry = await read();
    console.log("modbusRegistry")

    console.log(modbusRegistry)
    // if (modbusRegistry.status === 500) {
    //     res.sendStatus(500)
    //     return
    // }

    // return res.send({
    //     status: 200,
    //     message: modbusRegistry
    // })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
