import ModbusRTU from "modbus-serial";

const client = ModbusRTU();

function read() {
    client.readHoldingRegisters(5, 2)
        .then(console.log);
}

// while loop with timer to call read function
setInterval(read, 1000)