{ pkgs ? import <nixpkgs> {}
, mqtt-play ? ./. }:

let
  pkg = pkgs.callPackage mqtt-play {};
in rec {
  inherit (pkg) tarball;

  build = pkgs.lib.overrideDerivation pkg.build (o: {
    # Can't just test here because we don't have devDependencies
    checkPhase = ''
      [ -e ${test} ]
    '';
    doCheck = true;
  });

  test = pkgs.lib.overrideDerivation pkg.dev (o: {
    name = "${o.name}-test";
    checkPhase = ''
      export PLAY_COMMAND=${pkgs.sox}/bin/play
      npm run lint
      npm test
    '';
    doCheck = true;
  });

  # Will be run in a container with all Detox services running
  integrationTest = ''
    echo NOTE: No integration tests for mqtt-play.
  '';
}
