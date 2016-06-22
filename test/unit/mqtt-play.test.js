/* eslint-disable */
const assert = require('assert');

describe('mqtt-play', () => {
  describe('Player#addAudio()', () => {
    const player = require('${__dirname}/../../src/module/player.js')();
    it('should play audio without an error when file exists', (done) => {
      assert.doesNotThrow(() => {
        player.addAudio(`${__dirname}/../audio/test.mp3`);
      },
      Error,
      'Function does not throw');
      done();
    });

    it('should throw \'no such file\' error when when file doesn\'t exist', (done) => {
      assert.throws(() => {
        player.addAudio(`${__dirname}/../audio/audio.mp3`);
      },
      /no such file or directory/,
      'Function does throw');
      done();
    });
  });
});
