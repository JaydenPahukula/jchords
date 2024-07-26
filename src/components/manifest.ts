import { HeaderComponent } from "./header/header";

const componentManifest: {
    name: string,
    constructor: CustomElementConstructor,
    options?: ElementDefinitionOptions,
}[] = [
    { name: 'j-header', constructor: HeaderComponent },
];

export function registerCustomComponents() {
    for (const entry of componentManifest){
        customElements.define(entry.name, entry.constructor, entry.options);
    }
}
