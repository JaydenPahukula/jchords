import { createContext } from 'react';
import checkIfMobile from 'src/utils/checkifmobile';

interface ResponsivenessState {
  isMobile: boolean;
}

const defaultReponsivenessState: ResponsivenessState = {
  isMobile: checkIfMobile(),
};

const ResponsivenessContext = createContext<ResponsivenessState>(defaultReponsivenessState);

export default ResponsivenessContext;
