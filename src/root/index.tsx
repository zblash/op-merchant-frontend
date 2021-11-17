import * as React from 'react';
import { render } from 'react-dom';
import { registerLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { CheckHealth } from '@onlineplasiyer/op-web-fronted';
import App from '@/app/index';
import '@/assets/style';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import i18n from '@/i18n';

registerLocale('tr', tr);
const rootEl = document.getElementById('root');

let queryClientRef;
if (queryClientRef === undefined) {
  const queryCache = new QueryCache();
  queryClientRef = new QueryClient({
    queryCache,
    defaultOptions: {
      queries: {
        staleTime: 2 * 60 * 1000,
        retry: false,
        refetchOnWindowFocus: true,
      },
    },
  });
}

render(
  <>
    <I18nextProvider i18n={i18n}>
      <CheckHealth>
        <QueryClientProvider client={queryClientRef}>
          <App />
        </QueryClientProvider>
      </CheckHealth>
    </I18nextProvider>
  </>,
  rootEl,
);
