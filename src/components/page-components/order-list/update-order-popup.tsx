import React from 'react';
import DatePicker from 'react-datepicker';
import { ModalComponent } from '@/components/page-components/modal';
import { UIInput, UISelect } from '@/components/ui';
import { CreditPaymentType } from '@/utils/api/api-models';

interface UpdateOrderPopupComponentProps {
  orderId: string;
  isOpened: boolean;
  onSubmit: (id: string, paidPrice?: number, paymentType?: CreditPaymentType, waybillDate?: string) => void;
  onShowingChanged: (showing: boolean) => void;
}

/* UpdateOrderPopupComponent Component  */
function UpdateOrderPopupComponent(props: React.PropsWithChildren<UpdateOrderPopupComponentProps>) {
  /* UpdateOrderPopupComponent Variables */
  const [date, setDate] = React.useState(new Date());
  const [paymentType, setPaymentType] = React.useState<{ value: CreditPaymentType; label: string }>();
  const [paidPrice, setPaidPrice] = React.useState<number>();
  const paymentTypes = React.useMemo(() => {
    const array: Array<{ value: CreditPaymentType; label: string }> = [
      { value: 'CASH', label: 'Nakit' },
      { value: 'CREDIT_CARD', label: 'Kredi Karti' },
    ];

    return array;
  }, []);
  /* UpdateOrderPopupComponent Callbacks */
  const onAccept = React.useCallback(() => {
    props.onSubmit(
      props.orderId,
      paidPrice,
      paymentType?.value,
      `${date.getDate()}-${
        date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0'.concat((date.getMonth() + 1).toString())
      }-${date.getFullYear()}`,
    );
    setDate(new Date());
    setPaidPrice(0);
    setPaymentType(undefined);
  }, [date, paidPrice, paymentType, props]);

  const onClose = React.useCallback(() => {
    props.onShowingChanged(false);
    setDate(new Date());
    setPaidPrice(0);
    setPaymentType(undefined);
  }, [props]);
  /* UpdateOrderPopupComponent Lifecycle  */

  return (
    <ModalComponent isShowing={props.isOpened} showAcceptButton onAccept={onAccept} onClose={onClose}>
      <form>
        <UIInput
          placeholderKey="0.00"
          labelKey="Odenen Tutar"
          id="order-paid-price"
          name="order-paid-price"
          type="number"
          step="0.01"
          value={paidPrice}
          onChange={e => setPaidPrice(parseInt(e.target.value, 10))}
        />
        <label>Teslim Tarihi: </label>
        <DatePicker
          selected={date}
          onChange={selectedDate => setDate(selectedDate)}
          locale="tr"
          dateFormat="dd-MM-yyyy"
        />

        <UISelect
          isClearable
          onChange={e => setPaymentType(e as { value: CreditPaymentType; label: string })}
          value={paymentType}
          options={paymentTypes}
          placeholderKey="Odeme Yontemi"
          labelKey="Odeme Yontemi"
        />
      </form>
    </ModalComponent>
  );
}
const PureUpdateOrderPopupComponent = React.memo(UpdateOrderPopupComponent);

export { PureUpdateOrderPopupComponent as UpdateOrderPopupComponent };
