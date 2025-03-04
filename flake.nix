{
  description = "jchords";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }: (flake-utils.lib.eachDefaultSystem (system: let
    pkgs = import nixpkgs {inherit system;};
  in {
    devShells = {
      default = pkgs.mkShell {
        packages = with pkgs; [
          google-cloud-sdk
          firebase-tools
          jdk # needed for firebase emulators
          nodejs_22
        ];
        FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
        GOOGLE_APPLICATION_CREDENTIALS = "secrets/serviceaccount.json";
      };
    };
  }));
}
