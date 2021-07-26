import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

interface FooterProps {}

function Footer(props: React.PropsWithChildren<FooterProps>) {
  return (
    <Container fluid className="footer">
      <Row>
        <Col>
          <p>
            Copyright © 2021 <a href="#"> OnlinePLasiyer </a> All rights reserved
          </p>
        </Col>
      </Row>
    </Container>
  );
}
const PureFooter = React.memo(Footer);

export { PureFooter as Footer };
