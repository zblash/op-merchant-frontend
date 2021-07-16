import { UpdateOrderPopupParams } from '@/components/popups/update-order-popup';
import { EditCreditPopupParams } from '@/components/popups/edit-credit-popup';
import { EditShippingDaysPopupPropsParams } from '@/components/popups/edit-shipping-days-popup';

export interface Popup<O = undefined> {
  isShown: boolean;
  show: O extends undefined ? (options?: O) => void : (options: O) => void;
  hide: () => void;
  params: O;
}

export interface PopupContextType {
  addShippingDays: Popup;
  editShippingDays: Popup<EditShippingDaysPopupPropsParams>;
  addActiveState: Popup;
  updateOrder: Popup<UpdateOrderPopupParams>;
  editCredit: Popup<EditCreditPopupParams>;
}
