import React from 'react';
import Select from 'react-select';
import { ModalComponent } from '@/components/common/modal';
import { DaysOfWeek } from '@/utils/api/api-models';
import { shippingDays } from './utils';

interface EditShippingDaysPopupComponentProps {
  id: string;
  isOpened: boolean;
  stateName: string;
  shippingDays: DaysOfWeek[];
  onSubmit: (id: string, days: DaysOfWeek[]) => void;
  onShowingChanged: (showing: boolean) => void;
}

/* EditShippingDaysPopupComponent Component  */
function EditShippingDaysPopupComponent(props: React.PropsWithChildren<EditShippingDaysPopupComponentProps>) {
  /* EditShippingDaysPopupComponent Variables */
  const [selectedDays, setSelectedDays] = React.useState<Array<{ value: DaysOfWeek; label: string }>>();
  /* EditShippingDaysPopupComponent Callbacks */
  const onAccept = React.useCallback(() => {
    props.onSubmit(
      props.id,
      selectedDays.map(day => day.value),
    );
  }, [props, selectedDays]);
  /* EditShippingDaysPopupComponent Lifecycle  */

  React.useEffect(() => {
    if (props.shippingDays)
      setSelectedDays(
        props.shippingDays.map(day => {
          return {
            value: day,
            label: day.toString(),
          };
        }),
      );
  }, [props.shippingDays]);

  return (
    <ModalComponent
      isShowing={props.isOpened}
      showAcceptButton
      onAccept={onAccept}
      onClose={() => props.onShowingChanged(false)}
    >
      <form>
        <p>{props.stateName} Bolgesi Teslimat Gunleri</p>
        <label>Sevkiyat Gunleri</label>
        <Select
          isMulti
          isSearchable
          isClearable
          onChange={(e: Array<{ value: DaysOfWeek; label: string }>) => setSelectedDays(e)}
          value={selectedDays}
          options={shippingDays}
          placeholder="Secim Yapin"
        />
      </form>
    </ModalComponent>
  );
}
const PureEditShippingDaysPopupComponent = React.memo(EditShippingDaysPopupComponent);

export { PureEditShippingDaysPopupComponent as EditShippingDaysPopupComponent };
