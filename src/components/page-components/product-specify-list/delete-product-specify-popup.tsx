import React from 'react';
import { ModalComponent, ISpecifyProductResponse } from '@zblash/op-web-fronted';

interface DeleteProductSpecifyPopupComponentProps {
  isOpened: boolean;
  productSpecify?: ISpecifyProductResponse;
  onAccept: (productSpecifyId: string) => void;
  onShowingChanged: (showing: boolean) => void;
}

function DeleteProductSpecifyPopupComponent(props: React.PropsWithChildren<DeleteProductSpecifyPopupComponentProps>) {
  const onAccept = React.useCallback(() => {
    props.onAccept(props.productSpecify.id);
  }, [props]);

  return (
    <ModalComponent
      isShowing={props.isOpened}
      showAcceptButton
      showCloseButton
      onAccept={onAccept}
      onClose={() => props.onShowingChanged(false)}
    >
      <p>
        Sectiginiz {props.productSpecify?.productName} urunune ait fiyat tanimlamalariniz sistemden tamamen silinecek
        onayliyor musunuz?
      </p>
    </ModalComponent>
  );
}

export { DeleteProductSpecifyPopupComponent };
