import React from 'react';
import { Popup } from '@/components/ui/popup';
import { AddActiveState } from '@/components/popups/add-active-state-popup';
import { UpdateOrderPopup } from '@/components/popups/update-order-popup';
import { EditCreditPopup } from '@/components/popups/edit-credit-popup';
import { AddShippingDaysPopup } from '@/components/popups/add-shipping-days-popup';
import { EditShippingDaysPopup } from '@/components/popups/edit-shipping-days-popup';
import { PopupContextType } from './helpers';

type PopupsWrapperProps = PopupContextType;

function PopupsWrapper(props: PopupsWrapperProps) {
  const popupMapArray = [
    { ...props.addActiveState, comp: <AddActiveState /> },
    { ...props.updateOrder, comp: <UpdateOrderPopup params={props.updateOrder.params} /> },
    { ...props.editCredit, comp: <EditCreditPopup params={props.editCredit.params} /> },
    { ...props.addShippingDays, comp: <AddShippingDaysPopup /> },
    { ...props.editShippingDays, comp: <EditShippingDaysPopup params={props.editShippingDays.params} /> },
  ];

  return (
    <>
      {popupMapArray.map((item, index) => (
        <Popup onClose={item.hide} isShown={item.isShown} key={`popup${index}`}>
          {item.comp}
        </Popup>
      ))}
    </>
  );
}

export { PopupsWrapper };
