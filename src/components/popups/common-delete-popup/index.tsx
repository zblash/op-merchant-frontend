import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { colors } from '~/styled';
import { UIButton, Loading } from '~/components/ui';

/* CommonDeletePopup Helpers */
interface CommonDeletePopupProps {
  title: string | React.ReactElement;
  isLoading: boolean;
  errorText?: string;
  onDeleteClick: Function;
  onCancelClick: Function;
}

/* CommonDeletePopup Constants */

/* CommonDeletePopup Styles */

const StyledCommonDeletePopupWrapper = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 4px;
`;

const StyledQuestionTitle = styled.h4`
  margin: 16px 0 16px 0;
`;

const StyledButtonWrappers = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const StyledBottomWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const StyledDeleteButton = styled(UIButton)`
  background-color: transparent;
  color: ${colors.danger};
  border: 1px solid ${colors.danger};
  :hover {
    background-color: ${colors.danger};
    color: ${colors.white};
  }
`;
const StyledCancelButton = styled(UIButton)`
  margin-right: 16px;
  background-color: transparent;
  color: ${colors.primary};
  border: 1px solid ${colors.primary};
  :hover {
    background-color: ${colors.primary};
    color: ${colors.white};
  }
`;
const StyledErrorMessage = styled.span`
  color: red;
`;

/* CommonDeletePopup Component  */
function CommonDeletePopup(props: React.PropsWithChildren<CommonDeletePopupProps>) {
  const { t } = useTranslation();

  const __ = (
    <StyledCommonDeletePopupWrapper>
      <StyledQuestionTitle>{props.title}</StyledQuestionTitle>
      <StyledBottomWrapper>
        <StyledErrorMessage>{props.errorText}</StyledErrorMessage>
        <StyledButtonWrappers>
          <StyledCancelButton onClick={() => props.onCancelClick()}>
            {t('popups.delete-category.cancel')}
          </StyledCancelButton>
          <StyledDeleteButton onClick={() => props.onDeleteClick()}>
            {props.isLoading ? <Loading /> : t('popups.delete-category.delete')}
          </StyledDeleteButton>
        </StyledButtonWrappers>
      </StyledBottomWrapper>
    </StyledCommonDeletePopupWrapper>
  );

  /* CommonDeletePopup Lifecycle  */

  /* CommonDeletePopup Functions  */

  return __;
}

export { CommonDeletePopup };
