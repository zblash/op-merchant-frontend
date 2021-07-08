import * as React from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import styled, { colors } from "~/styled";
import { UIButton } from "~/components/ui";
import { queryEndpoints } from "~/services/query-context/query-endpoints";
import {
  IAddressStateResponse,
  DaysOfWeek,
} from "~/services/helpers/backend-models";
import { useMutation } from "~/services/mutation-context/context";
import { mutationEndPoints } from "~/services/mutation-context/mutation-enpoints";
import { usePopupContext } from "~/contexts/popup/context";
import { refetchFactory } from "~/services/utils";
import { useLoadingContext } from "~/contexts/loading-context";

/* AddShippingDaysPopup Helpers */
interface AddShippingDaysPopupProps {}

/* AddShippingDaysPopup Constants */

/* AddShippingDaysPopup Styles */
const StyledAddShippingDaysWrapper = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 4px;
`;
const StyledAddShippingDaysHeader = styled.div`
  border-bottom: 1px solid ${colors.lightGray};
  text-align: center;
  margin-bottom: 15px;
`;
const StyledAddShippingDaysFormWrapper = styled.div`
  margin-top: 10px;
`;
const StyledButton = styled(UIButton)`
display: flex;
float: right;
align-items: center;
transition: background-color 0.3s;
background-color: ${colors.primary};
color: ${colors.white};
padding: 4px 8px;
margin 3%;
border-radius: 8px;
:active {
  background-color: ${colors.primaryDark} !important;
}
:hover {
  background-color: ${colors.lightGray};
}
`;
/* AddShippingDaysPopup Component  */
function AddShippingDaysPopup(
  props: React.PropsWithChildren<AddShippingDaysPopupProps>
) {
  /* AddShippingDaysPopup Variables */
  const { t } = useTranslation();
  const popups = usePopupContext();
  const loading = useLoadingContext();
  const [selectedState, setSelectedState] = React.useState<{
    value: string;
    label: string;
  }>();
  const [selectedDays, setSelectedDays] = React.useState<
    Array<{ value: DaysOfWeek; label: string }>
  >();
  const [states, setStates] = React.useState<IAddressStateResponse[]>([]);
  const shippingDays = React.useMemo(
    () => [
      { label: t("shipping.days.MONDAY"), value: "MONDAY" },
      { label: t("shipping.days.TUESDAY"), value: "TUESDAY" },
      { label: t("shipping.days.WEDNESDAY"), value: "WEDNESDAY" },
      { label: t("shipping.days.THURSDAY"), value: "THURSDAY" },
      { label: t("shipping.days.FRIDAY"), value: "FRIDAY" },
      { label: t("shipping.days.SATURDAY"), value: "SATURDAY" },
      { label: t("shipping.days.SUNDAY"), value: "SUNDAY" },
    ],
    [t]
  );

  const { mutation: addShippingDays } = useMutation(
    mutationEndPoints.createShippingDays,
    {
      variables: {
        stateId: selectedState ? selectedState.value : null,
        days: selectedDays ? selectedDays.map((day) => day.value) : null,
      },
      refetchQueries: [refetchFactory(queryEndpoints.getShippingDays)],
    }
  );
  /* AddShippingDaysPopup Callbacks */

  const handleSubmit = React.useCallback(() => {
    loading.show();
    addShippingDays()
      .then(() => {
        popups.addShippingDays.hide();
      })
      .finally(() => {
        loading.hide();
      });
  }, [addShippingDays, loading, popups.addShippingDays]);

  /* AddShippingDaysPopup Lifecycle  */
  React.useEffect(() => {
    queryEndpoints.getAllowedStateForShippingDays().then((resp) => {
      setStates(resp);
    });
  }, []);

  return (
    <StyledAddShippingDaysWrapper>
      <StyledAddShippingDaysHeader>
        <p>Teslimat Gunu Ekle</p>
      </StyledAddShippingDaysHeader>
      <StyledAddShippingDaysFormWrapper>
        <label>Bolge Secin</label>
        <Select
          value={selectedState}
          onChange={(e: { value: string; label: string }) =>
            setSelectedState(e)
          }
          options={states.map((state) => ({
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
          onChange={(e: Array<{ value: DaysOfWeek; label: string }>) =>
            setSelectedDays(e)
          }
          value={selectedDays}
          options={shippingDays}
          placeholder="Secim Yapin"
        />
        <StyledButton type="button" onClick={handleSubmit}>
          Kaydet
        </StyledButton>
      </StyledAddShippingDaysFormWrapper>
    </StyledAddShippingDaysWrapper>
  );
}
const PureAddShippingDaysPopup = React.memo(AddShippingDaysPopup);

export { PureAddShippingDaysPopup as AddShippingDaysPopup };
