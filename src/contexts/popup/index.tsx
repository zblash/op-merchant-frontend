import * as React from 'react';
import { PopupContext, usePopup } from './context';
import { PopupsWrapper } from './popups-wrapper';
import { PopupContextType } from './helpers';

/* PopupContextProvider Helpers */
interface PopupContextProviderProps {}

function PopupContextProvider(props: React.PropsWithChildren<PopupContextProviderProps>) {
  const value: PopupContextType = {
    addActiveState: usePopup(),
    updateOrder: usePopup(),
    editCredit: usePopup(),
    addShippingDays: usePopup(),
    editShippingDays: usePopup(),
  };

  return (
    <PopupContext.Provider value={value}>
      {props.children}
      <PopupsWrapper {...value} />
    </PopupContext.Provider>
  );
}

const _PopupContextProvider = PopupContextProvider;

export { _PopupContextProvider as PopupContextProvider };
