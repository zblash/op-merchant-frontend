import * as React from 'react';
import { Container } from 'react-bootstrap';

function UIContainer({ children, className }: any) {
  return (
    <Container fluid className={`mt-5 ${className || ''}`}>
      {children}
    </Container>
  );
}

export { UIContainer };
