import * as React from 'react';
import { Popup, PopupContextType } from './helpers';

function usePopup<O = any>(): Popup<O> {
  const [isShown, setIsShown] = React.useState(false);
  const [options, setOptions] = React.useState(null);

  return {
    isShown,
    params: options,
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    show: _options => {
      setOptions(_options);
      setIsShown(true);
    },
    hide: () => {
      setIsShown(false);
    },
  };
}

const emptyPopup: Popup = {
  isShown: false,
  params: undefined,
  show: () => {},
  hide: () => {},
};

const initialValue: PopupContextType = {
  addActiveState: emptyPopup,
  deleteProductSpecify: emptyPopup,
  updateOrder: emptyPopup,
  editCredit: emptyPopup,
  addShippingDays: emptyPopup,
  editShippingDays: emptyPopup,
};
const PopupContext = React.createContext<PopupContextType>(initialValue);

function usePopupContext() {
  return React.useContext(PopupContext);
}

export { usePopup, usePopupContext, PopupContext };
