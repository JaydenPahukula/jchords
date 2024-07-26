
declare global {
    namespace JSX {

        interface IntrinsicElements {
			[tag: string]: {
                [key: string]: any
            };
        }

    }
}

// jsx factory
export function JSX(tag: string, props: { [id: string]: string } | null, ...children: string[]): string {
    props = props || {};
    const propsstr = Object.keys(props)
        .map(key => {
            const value = props[key];
            if (key === "className") return `class=${value}`;
            else return `${key}=${value}`;
        })
        .join(" ");
    return `<${tag} ${propsstr}> ${children.join("")}</${tag}>`;
}
export default JSX;
