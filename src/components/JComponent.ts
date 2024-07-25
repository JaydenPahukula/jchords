export abstract class JComponent extends HTMLElement {

    private readonly shadow = this.attachShadow({ mode: 'open' });;

    constructor(private readonly customStyle: string) {
        super();
    }

    private connectedCallback() {
        this.render();
    }

    private render() {
        this.shadow.innerHTML = `
            <style>
                ${this.customStyle}
            </style>
            ${this.template}
        `;;
    }

    protected abstract get template(): string;

};
