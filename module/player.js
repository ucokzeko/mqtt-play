const execFile = require('child_process').execFile;
const config = require('config.json')(`${__dirname}/../config.json`);
const playlist = [];
let isPlaying = false;

function Player() {
  this.addAudio = (path) => {
    console.log('New audio added to playlist');
    playlist.push(path);
    if (!isPlaying) {
      play(playlist.shift());
    }
  };
}

function play(path) {
  isPlaying = true;
  console.log('Playing audio. Current list:');
  console.log(playlist);
  execFile(config.player.command, [path], (error, stdout, stderr) => {
    if (error) {
      console.error(stderr, error);
    } else if (playlist.length > 0) {
      play(playlist.shift());
    } else {
      isPlaying = false;
      console.log('Finished playing');
    }
  });
}

module.exports = () => {
  const p = new Player();
  return p;
};
