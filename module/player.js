const execFile = require('child_process').execFile;
const config = require('config.json')(`${__dirname}/../config.json`);
const playlist = [];
const winston = require('winston');
let isPlaying = false;

function Player() {
  this.addAudio = (path) => {
    winston.info('New audio added to playlist');
    playlist.push(path);
    if (!isPlaying) {
      play(playlist.shift());
    }
  };
}

function play(path) {
  isPlaying = true;
  winston.info('Playing audio. Current list:');
  winston.info(playlist);
  execFile(config.player.command, [path], (error, stdout, stderr) => {
    if (error) {
      winston.error(stderr, error);
    } else if (playlist.length > 0) {
      play(playlist.shift());
    } else {
      isPlaying = false;
      winston.info('Finished playing');
    }
  });
}

module.exports = () => {
  const p = new Player();
  return p;
};
