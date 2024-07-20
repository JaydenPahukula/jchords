import {parseSong} from './songutils'

const root = document.getElementById('root');
if (!(root instanceof HTMLDivElement)){
    throw new Error("Could not find root div");
}

fetch('./song.json').then(async (response) => {
    const data = await response.json();
    root.appendChild(parseSong(data) || document.createTextNode('invalid song format'));
});
