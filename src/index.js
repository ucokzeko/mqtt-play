const mqtt = require('mqtt');
const config = require('config.json')(`${__dirname}/config.json`);
const playerCon = require('./module/player.js');
const winston = require('winston');

const client = mqtt.connect('mqtt://localhost');

const playCommand = (() => {
  if (process.env.INTEGRATION_TESTING) {
    return 'echo';
  } else if (process.env.PLAY_COMMAND) {
    return process.env.PLAY_COMMAND;
  }

  throw new Error('Missing PLAY_COMMAND environment variable');
})();

const player = playerCon(playCommand);
winston.info(`Player command: ${playCommand}`);
client.on('connect', () => {
  client.subscribe(config.topic.sub);
  winston.info(`Subscribed topic: ${config.topic.sub}`);
});

client.on('message', (topic, message) => {
  winston.info(`Message received: ${message.toString()}`);
  try {
    player.addAudio(message.toString());
  } catch (e) {
    winston.error(e);
  }
});
