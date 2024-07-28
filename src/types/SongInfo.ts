
export default interface SongInfo {
    id: string,
    name: string,
}

export function isSongInfo(object: any): object is SongInfo {
    return typeof object.name === 'string' && typeof object.id === 'string';
}
