import { JComponent } from "src/components/JComponent";
import style from './header.css?raw';
import JSX from "src/pragma";

export class JHeaderComponent extends JComponent {

    constructor(){
        super(style);
    }

    protected get template(){
        return (
            <div id="header-background">
                <h1>
                    This is the header!
                </h1>
                <a href="/" id="home-link">Home</a>
                <a href="/about" id="about-link">About</a>
            </div>
        );
    }
}
