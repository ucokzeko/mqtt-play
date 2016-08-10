function envOrBust(varName) {
  const result = process.env[varName];
  if (!result) {
    throw new Error(`Environment Variable ${varName} is not defined!`);
  }

  return result;
}

const mqttHost    = envOrBust('MOSQUITTO_ADDRESS');
const playCommand = envOrBust('PLAY_COMMAND');

const playTopic = 'play/audio';

module.exports = {
  playTopic,
  mqttHost,
  playCommand
};
