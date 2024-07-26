import { HeaderComponent } from "./header/header";
import { TestComponent } from "./test/test";

export const componentManifest: {
    name: string,
    constructor: CustomElementConstructor,
    options?: ElementDefinitionOptions,
}[] = [
    { name: 'j-header', constructor: HeaderComponent },
    { name: 'j-test', constructor: TestComponent },
];

export function registerCustomComponents() {
    for (const entry of componentManifest){
        customElements.define(entry.name, entry.constructor, entry.options);
    }
}
