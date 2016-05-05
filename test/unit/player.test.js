describe('Audio processing', () => {
  const player = require('../../src/module/player.js')();

  describe('Playing audio file', () => {
    const path = './test/audio/test.mp3';

    it('Audio should be playing now', () => {
      player.addAudio(path);
    });
  });
});
