import Key from './key';

export default interface Settings {
  key: Key | undefined;
}

export const defaultSettings: Settings = {
  key: undefined,
};
