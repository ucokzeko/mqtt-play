# mqtt-play

Node app that listens to MQTT queue on specific topic (can be found in `./src/config.json`) and plays an audio file on a path.

### Setup Basics
- `git clone https://github.com/ucokzeko/mqtt-play.git`
- `npm install`
- update `"command"` in config file (`./src/config.json`) to fit your local player installed (This command has to be available via command line)
- `npm start`


### Notes
Expected mqtt message format:
```
'/home/user/Downloads/test.mp3'
```
This audio path has to be a full path.

### Usage
Run test script `npm test` to test if you set it up properly.

or

You can manually publish a message to specified topic with `mosquitto_pub`

For example:
`mosquitto_pub -h localhost -t 'play/audio' -m '/home/user/Downloads/test.mp3'`