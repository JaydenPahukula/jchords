import { JHeader } from "./header/header";

const componentManifest: {
    name: string,
    constructor: CustomElementConstructor,
    options?: ElementDefinitionOptions,
}[] = [
    { name: 'j-header', constructor: JHeader },
];

export function registerCustomComponents() {
    for (const entry of componentManifest){
        customElements.define(entry.name, entry.constructor, entry.options);
    }
}
