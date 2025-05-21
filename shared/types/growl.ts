import { ComponentChild } from 'preact';

export interface Growl {
  content: ComponentChild;
  type?: Growl;
}
