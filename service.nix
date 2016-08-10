{mkService, callPackage, nodejs, sox, mqtt-play ? callPackage ./release.nix {}, mosquitto}:

mkService rec {
  name = "mqtt-play";

  user.name = "mqtt-play";
  user.groups = ["audio"];

  dependsOn = [ mosquitto ];
  deviceAccess = true;

  environment.PLAY_COMMAND = "${sox}/bin/play";
  
  script = "exec ${nodejs}/bin/node --use_strict ${mqtt-play.build}/lib/node_modules/mqtt-play/src/index.js";
}
