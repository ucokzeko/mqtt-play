"use strict";

const player = require('play-sound')(); 
let playlist = [];
let isPlaying = false;

function Player() {
  this.addAudio = function(msgString) {
    playlist.push(msgString);
    console.log('Path added');
    if (!isPlaying) {
      play(playlist.shift());
    }
  };
}

function play(path) {
  console.log('Playlist: ' + playlist);
  isPlaying = true;
  player.play(path, function(err){
    if (err) {
      console.log(err);
    } else if (playlist.length > 0) {
      console.log('Playing next one');
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