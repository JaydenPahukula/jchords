{
  description = "JChords Development Flake";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }: (flake-utils.lib.eachDefaultSystem (system: let
    pkgs = import nixpkgs {inherit system;};
  in {
    devShells = {
      default = pkgs.mkShell {
        packages = with pkgs; [
          google-cloud-sdk
          firebase-tools
          jdk21_headless # needed for firebase emulators
          nodejs_22
        ];
        # env vars
        FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
        GOOGLE_APPLICATION_CREDENTIALS = "secrets/serviceaccount.json";
      };
    };
  }));
}
