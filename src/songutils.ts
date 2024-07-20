
interface RawSongObject {
    name: string,
}

function isRawSongObject(data: any): data is RawSongObject {
    return typeof data === 'object' &&
        typeof data['name'] === 'string' &&
        typeof data['defaultKey'] === 'number' && data['defaultKey'] >= 0 && data['defaultKey'] <= 12;
}

export function parseSong(song: any): HTMLDivElement | undefined {
    if (!isRawSongObject(song)){
        return undefined;
    }
    const div = document.createElement('div');

    const title = document.createElement('h1');
    title.textContent = song.name;
    div.appendChild(title);

    return div;
}