import JSX from "src/pragma"
import { Component, ComponentDecorator } from "../Component";

@ComponentDecorator
export class TestComponent extends Component {

    private testInput: string;

    constructor(){
        super('');
        this.testInput = "test"
        // console.log(this.test);
    };

    protected getTemplate = () => (
        <p>{this.testInput}</p>
    );
}
