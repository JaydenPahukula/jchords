export default class SongNotFoundError extends Error {
  constructor(id: string) {
    super(`No song exists with id '${id}'`);
    this.name = 'SongNotFoundError';
  }
}
