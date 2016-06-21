/* eslint-disable */
if (!process.env.PLAY_COMMAND) {
  process.env.PLAY_COMMAND = 'afplay';
}

describe('mqtt-play', () => {
  describe('add audio file function', () => {
    const player = require('${__dirname}/../../src/module/player.js')();
    it('should play audio without an error when file exists', (done) => {
      player.addAudio(`${__dirname}/../audio/test.mp3`);
      done();
    });

    it('should throw an error when when file doesn\'t exist', (done) => {
      try {
        player.addAudio(`${__dirname}/../audio/audio.mp3`);
      } catch (e) {
        done();
      }
    });
  });
  describe('play command', () => {
    const execFile = require('child_process').execFile;
    const config = require(`${__dirname}/../../src/config.json`);
    it('should play an audio without an error when command is available', function (done) {
      this.timeout(1000 * 5);
        if (!error) { done(); }
      execFile(process.env.PLAY_COMMAND, [`${__dirname}/../audio/test.mp3`], (error) => {
      });
    });

    it('should receive an error when command is unavailable', (done) => {
      execFile('play', [`${__dirname}/../audio/test.mp3`], (error) => {
        if (error) { done(); }
      });
    });
  });
});
