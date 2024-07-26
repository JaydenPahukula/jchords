import { Component } from "src/components/Component";
import style from './header.css?raw';
import JSX from "src/pragma";

export class HeaderComponent extends Component {

    constructor(){
        super(style);
    }

    protected getTemplate = () => (
        <div id="header-background">
            <h1>
                This is the header!
            </h1>
            <a href="/" id="home-link">Home</a>
            <a href="/about" id="about-link">About</a>
            <j-test testInput="test"></j-test>
        </div>
    );
}
