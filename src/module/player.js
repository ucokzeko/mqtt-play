const execFile = require('child_process').execFile;
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
