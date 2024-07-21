import { JComponent } from "src/components/JComponent";
import template from './header.html?raw';
import style from './header.css?raw';

export class JHeader extends JComponent {

    constructor(){
        super(template, style);
    }
}
