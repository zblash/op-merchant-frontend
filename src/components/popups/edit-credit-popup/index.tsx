import * as React from 'react';
import styled, { colors } from '~/styled';
import { ICreditResponse, IUserCreditResponse } from '~/services/helpers/backend-models';
import { useAlert } from '~/utils/hooks';
import { usePopupContext } from '~/contexts/popup/context';
import { UIInput, UIButton } from '~/components/ui';
import { useCreditMutation } from '~/queries/mutations/use-edit-credit';
import { useLoadingContext } from '~/contexts/loading-context';

/* EditCreditPopup Helpers */
export interface EditCreditPopupParams {
  credit: IUserCreditResponse | ICreditResponse;
}
interface EditCreditPopupProps {
  params: EditCreditPopupParams;
}

/* EditCreditPopup Constants */

/* EditCreditPopup Styles */
const StyledWrapper = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 4px;
`;
const StyledHeader = styled.div`
  border-bottom: 1px solid ${colors.lightGray};
`;
const StyledFormWrapper = styled.div`
  margin-top: 10px;
`;
const StyledInput = styled(UIInput)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 4px;
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
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
:disabled {
  background-color: ${colors.lightGray};
}
`;
/* EditCreditPopup Component  */
function EditCreditPopup(props: React.PropsWithChildren<EditCreditPopupProps>) {
  /* EditCreditPopup Variables */
  const popups = usePopupContext();
  const alert = useAlert();
  const [creditLimit, setCreditLimit] = React.useState(props.params.credit.creditLimit);
  const [totalDebt, setTotalDebt] = React.useState(props.params.credit.totalDebt);

  const { mutate: editUserCredit, isLoading } = useCreditMutation();
  const loading = useLoadingContext();

  /* EditCreditPopup Callbacks */

  const handleSubmit = React.useCallback(
    e => {
      e.preventDefault();
      editUserCredit({
        creditId: props.params.credit.id,
        totalDebt,
        creditLimit,
        customerId: props.params.credit.customerId,
      });

      alert.show('Kredi Guncellendi', { type: 'success' });
      popups.editCredit.hide();
    },
    [
      editUserCredit,
      props.params.credit.id,
      props.params.credit.customerId,
      totalDebt,
      creditLimit,
      alert,
      popups.editCredit,
    ],
  );

  React.useEffect(() => {
    if (isLoading) {
      loading.show();
    } else {
      loading.hide();
    }
  }, [isLoading, loading]);
  /* EditCreditPopup Lifecycle  */

  return (
    <StyledWrapper>
      <StyledHeader>
        <p>Krediyi Guncelle</p>
      </StyledHeader>
      <form onSubmit={e => handleSubmit(e)}>
        <StyledFormWrapper>
          <label>Toplam Borc</label>
          <StyledInput
            id="edit-credit-total-debt"
            type="number"
            value={totalDebt}
            step="0.1"
            required
            onChange={e => setTotalDebt(parseFloat(e))}
            placeholder="Toplam Borc"
          />
          <label>Kredi Limiti</label>
          <StyledInput
            id="edit-credit-credit-limit"
            type="number"
            step="0.1"
            value={creditLimit}
            required
            onChange={e => setCreditLimit(parseFloat(e))}
            placeholder="Kredi Limiti"
          />
          <StyledButton type="submit" disabled={!totalDebt || !creditLimit}>
            Kaydet
          </StyledButton>
        </StyledFormWrapper>
      </form>
    </StyledWrapper>
  );
}
const PureEditCreditPopup = React.memo(EditCreditPopup);

export { PureEditCreditPopup as EditCreditPopup };
