import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ModalComponentProps {
  header?: string;
  isShowing: boolean;
  children: React.ReactNode;
  onClose: () => void;
  showCloseButton?: boolean;
  showAcceptButton?: boolean;
  onAccept?: () => void;
}

/* ModalComponent Component  */
function ModalComponent(props: React.PropsWithChildren<ModalComponentProps>) {
  /* ModalComponent Variables */

  /* ModalComponent Callbacks */

  /* ModalComponent Lifecycle  */

  return (
    <Modal
      show={props.isShowing}
      onHide={props.onClose}
      dialogClassName="modal-90w"
      aria-labelledby={`modal-${props.header}`}
    >
      <Modal.Header closeButton>
        <Modal.Title id={`modal-title-${props.header}`}>{props.header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {props.showCloseButton && (
          <Button variant={props.showAcceptButton ? 'secondary' : 'primary'} onClick={props.onClose}>
            Close
          </Button>
        )}
        {props.showAcceptButton && (
          <Button variant="primary" onClick={props.onAccept}>
            Onayla
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
const PureModalComponent = React.memo(ModalComponent);

export { PureModalComponent as ModalComponent };
