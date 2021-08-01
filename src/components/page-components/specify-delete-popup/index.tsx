import React from 'react';
import { ModalComponent } from '@/components/page-components/modal';

interface SpecifyDeletePopupComponentProps {
  specifyId: string;
  isOpened: boolean;
  onDeleteClicked: (specifyId: string) => void;
  onShowingChanged: (showing: boolean) => void;
}

/* SpecifyDeletePopupComponent Component  */
function SpecifyDeletePopupComponent(props: React.PropsWithChildren<SpecifyDeletePopupComponentProps>) {
  /* SpecifyDeletePopupComponent Variables */

  /* SpecifyDeletePopupComponent Callbacks */
  const onDelete = React.useCallback(() => {
    props.onDeleteClicked(props.specifyId);
  }, [props]);
  /* SpecifyDeletePopupComponent Lifecycle  */

  return (
    <ModalComponent
      isShowing={props.isOpened}
      showAcceptButton
      onAccept={onDelete}
      onClose={() => props.onShowingChanged(false)}
    >
      <p>Urun Tanimlamanizi tamamen sileceksiniz.</p>
    </ModalComponent>
  );
}
const PureSpecifyDeletePopupComponent = React.memo(SpecifyDeletePopupComponent);

export { PureSpecifyDeletePopupComponent as SpecifyDeletePopupComponent };
