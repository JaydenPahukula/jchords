
declare global {
    namespace JSX {

        type IntrinsicElements = {
            [K in keyof HTMLElementTagNameMap]: {
                [k: string]: any
            }
        }
        
    }
}

// jsx factory
export function JSX(name: string, props: { [id: string]: string } | null, ...content: string[]): string {
    props = props || {};
    const propsstr = Object.keys(props)
        .map(key => {
            const value = props[key];
            if (key === "className") return `class=${value}`;
            else return `${key}=${value}`;
        })
        .join(" ");
    return `<${name} ${propsstr}> ${content.join("")}</${name}>`;
}
export default JSX;
