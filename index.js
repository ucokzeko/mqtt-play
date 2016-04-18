"use strict";

const mqtt = require('mqtt');
const config = require('config.json')('./config.json');
const player = require('./module/player.js')();

const client = mqtt.connect('mqtt://localhost');

client.on('connect', function () {
  client.subscribe(config.channel.sub);
});
 
client.on('message', function (topic, message) {
  console.log('-- Message received ---');
  console.log('Audio path: ' + message.toString());
  player.addAudio(message.toString());
});