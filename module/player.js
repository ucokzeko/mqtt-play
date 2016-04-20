const player = require('play-sound')(); 
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
  player.play(path, function(err){
    if (err) {
      console.log(err);
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