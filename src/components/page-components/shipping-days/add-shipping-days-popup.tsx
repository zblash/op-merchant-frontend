import React from 'react';
import { ModalComponent } from '@/components/page-components/modal';
import { DaysOfWeek, IAddressStateResponse } from '@/utils/api/api-models';
import { UISelect } from '@/components/ui';
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
        <UISelect
          value={selectedState}
          labelKey="Bolge Secin"
          placeholderKey="Sevkiyat Gunleri"
          onChange={(e: { value: string; label: string }) => setSelectedState(e)}
          options={props.states.map(state => ({
            value: state.id,
            label: `${state.cityTitle}-${state.title}`,
          }))}
        />

        <UISelect
          isMulti
          isSearchable
          isClearable
          isDisabled={!selectedState}
          onChange={(e: Array<{ value: DaysOfWeek; label: string }>) => setSelectedDays(e)}
          value={selectedDays}
          options={shippingDays}
          labelKey="Sevkiyat Gunleri"
          placeholderKey="Sevkiyat Gunleri"
        />
      </form>
    </ModalComponent>
  );
}
const PureAddShippingDaysPopupComponent = React.memo(AddShippingDaysPopupComponent);

export { PureAddShippingDaysPopupComponent as AddShippingDaysPopupComponent };
