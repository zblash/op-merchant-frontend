import * as React from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import styled, { colors } from "~/styled";
import { UIButton } from "~/components/ui";
import { usePopupContext } from "~/contexts/popup/context";
import { DaysOfWeek } from "~/services/helpers/backend-models";
import { useMutation } from "~/services/mutation-context/context";
import { mutationEndPoints } from "~/services/mutation-context/mutation-enpoints";
import { refetchFactory } from "~/services/utils";
import { queryEndpoints } from "~/services/query-context/query-endpoints";
import { useLoadingContext } from "~/contexts/loading-context";

/* EditShippingDaysPopup Helpers */
export interface EditShippingDaysPopupPropsParams {
  stateName: string;
  id: string;
}
interface EditShippingDaysPopupProps {
  params: EditShippingDaysPopupPropsParams;
}
/* EditShippingDaysPopup Constants */

/* EditShippingDaysPopup Styles */
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
/* EditShippingDaysPopup Component  */
function EditShippingDaysPopup(
  props: React.PropsWithChildren<EditShippingDaysPopupProps>
) {
  /* EditShippingDaysPopup Variables */
  const { t } = useTranslation();
  const popups = usePopupContext();
  const loading = useLoadingContext();
  const [selectedDays, setSelectedDays] = React.useState<
    Array<{ value: DaysOfWeek; label: string }>
  >();
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

  const { mutation: updateShippingDays } = useMutation(
    mutationEndPoints.updateShippingDays,
    {
      variables: {
        shippingDaysId: props.params.id,
        days: selectedDays ? selectedDays.map((day) => day.value) : null,
      },
      refetchQueries: [refetchFactory(queryEndpoints.getShippingDays)],
    }
  );
  /* EditShippingDaysPopup Callbacks */

  const handleSubmit = React.useCallback(() => {
    loading.show();
    updateShippingDays()
      .then(() => {
        popups.editShippingDays.hide();
      })
      .finally(() => {
        loading.hide();
      });
  }, [updateShippingDays, loading, popups.editShippingDays]);

  /* EditShippingDaysPopup Lifecycle  */

  return (
    <StyledAddShippingDaysWrapper>
      <StyledAddShippingDaysHeader>
        <p>{props.params.stateName}Teslimat Gunlerini Duzenle</p>
      </StyledAddShippingDaysHeader>
      <StyledAddShippingDaysFormWrapper>
        <Select
          isMulti
          isSearchable
          isClearable
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
const PureEditShippingDaysPopup = React.memo(EditShippingDaysPopup);

export { PureEditShippingDaysPopup as EditShippingDaysPopup };
