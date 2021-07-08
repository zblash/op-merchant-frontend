import * as React from 'react';
import { render } from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { registerLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
import { I18nextProvider } from 'react-i18next';
import { CheckHealth } from '~/controls/check-health';
import { ServicesContextProvider } from '~/services/index';
import App from '~/app/index';
import '~/assets/style';
import AlertTemplate from '~/contexts/alert-template/index';
import 'react-datepicker/dist/react-datepicker.css';
import i18n from '~/i18n';

registerLocale('tr', tr);
const rootEl = document.getElementById('root');
const options = {
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: '10px',
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 100,
    width: 500,
  },
};

render(
  <>
    <I18nextProvider i18n={i18n}>
      <AlertProvider template={AlertTemplate} {...options}>
        <CheckHealth>
          <ServicesContextProvider>
            <App />
          </ServicesContextProvider>
        </CheckHealth>
      </AlertProvider>
    </I18nextProvider>
  </>,
  rootEl,
);
