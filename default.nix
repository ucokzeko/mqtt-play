{ mqtt-play ? { outPath = ./.; name = "mqtt-play"; }
, pkgs ? import <nixpkgs> {}
}:
let
  nodePackages = import "${pkgs.path}/pkgs/top-level/node-packages.nix" {
    inherit pkgs;
    inherit (pkgs) stdenv nodejs fetchurl fetchgit;
    neededNatives = [ pkgs.python ] ++ pkgs.lib.optional pkgs.stdenv.isLinux pkgs.utillinux;
    self = nodePackages;
    generated = ./package.nix;
  };
in rec {
  tarball = pkgs.runCommand "mqtt-play-0.0.1.tgz" { buildInputs = [ pkgs.nodejs ]; } ''
    mv `HOME=$PWD npm pack ${mqtt-play}` $out
  '';
  build = nodePackages.buildNodePackage {
    name = "mqtt-play-0.0.1";
    src = [ tarball ];
    buildInputs = nodePackages.nativeDeps."mqtt-play" or [];
    deps = [ nodePackages.by-spec."mqtt"."1.8.0" nodePackages.by-spec."config.json"."0.0.4" nodePackages.by-spec."winston"."2.2.0" nodePackages.by-spec."mocha"."^2.5.3" ];
    peerDependencies = [];
  };
  dev = build.override {
    buildInputs = build.buildInputs ++ [ nodePackages.by-spec."eslint"."^2.8.0" nodePackages.by-spec."eslint-config-airbnb"."^7.0.0" nodePackages.by-spec."eslint-plugin-jsx-a11y"."^0.6.2" nodePackages.by-spec."eslint-plugin-react"."^4.3.0" ];
  };
}