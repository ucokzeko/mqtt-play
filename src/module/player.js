const execFile = require('child_process').execFile;
const config = require('config.json')(`${__dirname}/../config.json`);
let playlist = [];
let isPlaying = false;

function Player() {
  this.addAudio = function(path) {
    playlist.push(path);
    console.log('Path added. Current list:');
    console.log(playlist);
    if (!isPlaying) {
      play(playlist.shift());
    }
  };
}

function play(path) {
  console.log('Currently playing: ' + path);
  isPlaying = true;

  const child = execFile(config.player.command, [path], (error, stdout, stderr) => {
    if (error) {
      console.log(error);
    } else if (playlist.length > 0) {
      console.log('Playing next one. Current list size: ' + playlist.length);
      play(playlist.shift());
    } else {
      console.log('Finished');
      isPlaying = false;
    }
  });
}

module.exports = function(){
  return new Player();
};