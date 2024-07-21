export abstract class JComponent extends HTMLElement {

    private readonly shadow = this.attachShadow({ mode: 'open' });;

    private html: string;

    constructor(template: string, style: string) {
        super();
        this.html = `
            <style>
                ${style}
            </style>
            ${template}
        `;
    }

    private connectedCallback() {
        this.render();
    }

    private render() {
        this.shadow.innerHTML = this.html;
    }

};
