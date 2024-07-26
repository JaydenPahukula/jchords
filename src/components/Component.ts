

// export function ComponentDecorator() {
//     return function <T extends { new (...args: any[]): {} }>(constructor: T) {
//         constructor.prototype.test = "hello";
//         return class extends constructor {
//             test = "hello";
//         };
//     } 
// }

export function ComponentDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      reportingURL = "http://www...";
    };
  }

export abstract class Component extends HTMLElement {

    private readonly shadow = this.attachShadow({ mode: 'open' });

    private inputKeys = [];

    constructor(private readonly customStyle: string) {
        super();
    }

    private connectedCallback() {
        this.render();
    }

    // private attributeChangedCallback(name, oldVal, newVal) {
    //     this.render();
    // }

    private render() {
        this.shadow.innerHTML = `
            <style>
                ${this.customStyle}
            </style>
            ${this.getTemplate()}
        `;
    }

    protected abstract getTemplate(): string;

};


