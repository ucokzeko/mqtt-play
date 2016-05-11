const mqtt = require('mqtt');
const config = require('config.json')(`${__dirname}/config.json`);
const player = require('./module/player.js')();
const winston = require('winston');

const client = mqtt.connect('mqtt://localhost');

if (process.env.PLAY_COMMAND) {
  winston.info(`Player command: ${process.env.PLAY_COMMAND}`);
  client.on('connect', () => {
    client.subscribe(config.topic.sub);
    winston.info(`Subscribed topic: ${config.topic.sub}`);
  });

  client.on('message', (topic, message) => {
    winston.info(`Message received: ${message.toString()}`);
    player.addAudio(message.toString());
  });
} else {
  winston.error('Missing PLAY_COMMAND environment variable');
}
