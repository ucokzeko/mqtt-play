{mkService, callPackage, nodejs, sox, mqtt-play ? callPackage ./default.nix {}, mosquitto}:

mkService {
  name = "mqtt-play";
  dependsOn = [ mosquitto ];
  environment.PLAY_COMMAND = "${sox}/bin/play";
  script = "exec ${nodejs}/bin/node --use_strict ${mqtt-play.build}/lib/node_modules/mqtt-play/src/index.js";
}
