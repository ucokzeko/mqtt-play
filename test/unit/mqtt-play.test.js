/* eslint-disable */
const assert = require('assert');

if (!process.env.PLAY_COMMAND) {
  process.env.PLAY_COMMAND = 'afplay';
}

describe('mqtt-play', () => {
  describe('add audio file function', () => {
    const player = require('${__dirname}/../../src/module/player.js')();
    it('should play audio without an error when file exists', (done) => {
      assert.doesNotThrow(() => {
        player.addAudio(`${__dirname}/../audio/test.mp3`);
      },
      Error,
      'Function does not throw');
      done();
    });

    it('should throw an error when when file doesn\'t exist', (done) => {
      assert.throws(() => {
        player.addAudio(`${__dirname}/../audio/audio.mp3`);
      },
      Error,
      'Function does throw');
      done();
    });
  });
  describe('play command', () => {
    const execFile = require('child_process').execFile;
    it('should play an audio without an error when command is available', function (done) {
      this.timeout(1000 * 5);
      execFile(process.env.PLAY_COMMAND, [`${__dirname}/../audio/test.mp3`], (error) => {
        assert.ifError(error);
        done();
      });
    });

    it('should receive an error when command is unavailable', (done) => {
      execFile('play', [`${__dirname}/../audio/test.mp3`], (error) => {
        assert.throws(() => {
          assert.ifError(error);
        },
        Error,
        'Function does throw');
        done();
      });
    });
  });
});
