const SerialPort = require('serialport').SerialPort;
const { ReadlineParser } = require('@serialport/parser-readline')


const port = new SerialPort( {path: 'COM4', baudRate: 19200 });
// const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }))

// Read the port data
port.on("open", () => {
  console.log('serial port open');
});
port.on('data', data =>{
  console.log('got word from arduino:', data);
});