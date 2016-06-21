const fs       = require('fs');
const winston  = require('winston');
const execFile = require('child_process').execFile;

const playlist = [];
let isPlaying  = false;

function Player() {
  this.addAudio = (path) => {
    try {
      fs.lstatSync(path);
      playlist.push(path);
      if (!isPlaying) {
        play(playlist.shift());
      }
      winston.info(`${path} has been added to audio list.`);
    } catch (e) {
      throw e;
    }
  };
}

function play(path) {
  isPlaying = true;
  winston.info('Playing audio. Current list:');
  winston.info(playlist);
  execFile(process.env.PLAY_COMMAND, [path], (error, stdout, stderr) => {
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
