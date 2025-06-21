import { ReactNode } from 'react';

export interface Growl {
  content: ReactNode;
  type?: Growl;
}
