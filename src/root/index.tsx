import * as React from 'react';
import { render } from 'react-dom';
import { registerLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
import { I18nextProvider } from 'react-i18next';
import { CheckHealth } from '~/components/controls/check-health';
import { ServicesContextProvider } from '~/services/index';
import App from '~/app/index';
import '~/assets/style';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import i18n from '~/i18n';

registerLocale('tr', tr);
const rootEl = document.getElementById('root');

render(
  <>
    <I18nextProvider i18n={i18n}>
      <CheckHealth>
        <ServicesContextProvider>
          <App />
        </ServicesContextProvider>
      </CheckHealth>
    </I18nextProvider>
  </>,
  rootEl,
);
