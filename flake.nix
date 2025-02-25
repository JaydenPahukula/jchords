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
          jdk21_headless # needed for firebase emulators
          nodejs
        ];
      };
    };
  }));
}
