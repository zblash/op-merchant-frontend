import React from 'react';
import Select from 'react-select';
import { ModalComponent } from '@/components/page-components/modal';
import { DaysOfWeek, IAddressStateResponse } from '@/utils/api/api-models';
import { shippingDays } from './utils';

interface AddShippingDaysPopupComponentProps {
  isOpened: boolean;
  states: IAddressStateResponse[];
  onSubmit: (stateId: string, days: DaysOfWeek[]) => void;
  onShowingChanged: (showing: boolean) => void;
}

/* AddShippingDaysPopupComponent Component  */
function AddShippingDaysPopupComponent(props: React.PropsWithChildren<AddShippingDaysPopupComponentProps>) {
  /* AddShippingDaysPopupComponent Variables */
  const [selectedState, setSelectedState] = React.useState<{
    value: string;
    label: string;
  }>();
  const [selectedDays, setSelectedDays] = React.useState<Array<{ value: DaysOfWeek; label: string }>>();
  /* AddShippingDaysPopupComponent Callbacks */
  const onAccept = React.useCallback(() => {
    props.onSubmit(
      selectedState.value,
      selectedDays.map(day => day.value),
    );
  }, [props, selectedDays, selectedState]);
  /* AddShippingDaysPopupComponent Lifecycle  */

  return (
    <ModalComponent
      isShowing={props.isOpened}
      showAcceptButton
      onAccept={onAccept}
      onClose={() => props.onShowingChanged(false)}
    >
      <form>
        <label>Bolge Secin</label>
        <Select
          value={selectedState}
          onChange={(e: { value: string; label: string }) => setSelectedState(e)}
          options={props.states.map(state => ({
            value: state.id,
            label: `${state.cityTitle}-${state.title}`,
          }))}
        />
        <label>Sevkiyat Gunleri</label>
        <Select
          isMulti
          isSearchable
          isClearable
          isDisabled={!selectedState}
          onChange={(e: Array<{ value: DaysOfWeek; label: string }>) => setSelectedDays(e)}
          value={selectedDays}
          options={shippingDays}
          placeholder="Secim Yapin"
        />
      </form>
    </ModalComponent>
  );
}
const PureAddShippingDaysPopupComponent = React.memo(AddShippingDaysPopupComponent);

export { PureAddShippingDaysPopupComponent as AddShippingDaysPopupComponent };
