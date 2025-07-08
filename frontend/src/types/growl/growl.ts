import { ReactNode } from 'react';

export interface Growl {
  title?: ReactNode;
  description: ReactNode;
  closeButton?: boolean;
}
