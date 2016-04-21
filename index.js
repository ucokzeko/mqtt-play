const mqtt = require('mqtt');
const config = require('config.json')('./config.json');
const player = require('./module/player.js')();

const client = mqtt.connect('mqtt://localhost');

client.on('connect', () => {
  client.subscribe(config.channel.sub);
});

client.on('message', (topic, message) => {
  console.log(`Message received: ${message.toString()}`);
  player.addAudio(message.toString());
});
