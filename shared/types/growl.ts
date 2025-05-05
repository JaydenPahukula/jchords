import { ComponentChild } from 'preact';

export default interface Growl {
  content: ComponentChild;
  type?: Growl;
}
