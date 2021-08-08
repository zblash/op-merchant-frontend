import * as React from 'react';
import { Container } from 'react-bootstrap';

const UIContainer: React.FC = ({ children }: any) => {
  return (
    <Container fluid className="mt-5">
      {children}
    </Container>
  );
};

export { UIContainer };
