import * as React from 'react';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import Logo from '@/assets/images/logo/flogo.png';
import { useLocation } from 'react-router-dom';
import { useWindowSize } from '@onlineplasiyer/op-web-fronted';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
/* LoginPage Helpers */

/* LoginPage Constants */

/* LoginPage Component  */
function LoginRegisterPage() {
  /* LoginPage Variables */
  const location = useLocation();
  const { width } = useWindowSize();
  /* LoginPage Callbacks */

  /* LoginPage Lifecycle  */

  return (
    <Container className="mt-3 page-wrapper">
      <Row>
        {width >= 768 && (
          <Col className="d-flex justify-content-center mb-5" lg={12} xl={12} md={12} xs={12} sm={12}>
            <img src={Logo} alt="OnlinePlasiyer" />
          </Col>
        )}
        <Col
          lg={12}
          xl={12}
          md={12}
          xs={12}
          sm={12}
          className="d-flex justify-content-center flex-column align-items-center"
        >
          <h3 className="font-weight-bold mb-3">Merhaba,</h3>
          <p className="font-weight-bold  mb-4">
            Onlineplasiyer'e giriş yap veya hesap oluştur. Anında ürünlerini sat.
          </p>
        </Col>
        <Col lg={12} xl={12} md={12} xs={12} sm={12} className="mb-5">
          <Tab.Container
            id="login-register-tab-container"
            defaultActiveKey={location.pathname === '/login' ? 'login' : 'register'}
          >
            <Row className="d-flex justify-content-center align-items-center flex-column">
              <Col lg={6} xl={6} md={10} xs={10} sm={10}>
                <Nav justify variant="tabs">
                  <Nav.Item>
                    <Nav.Link className="rounded-0" eventKey="login">
                      Giriş Yap
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="rounded-0" eventKey="register">
                      Üye Ol
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col lg={6} xl={6} md={10} xs={10} sm={10}>
                <Tab.Content className="border-right border-bottom border-left w-100 py-5">
                  <Tab.Pane eventKey="login">
                    <LoginComponent />
                  </Tab.Pane>
                  <Tab.Pane eventKey="register">
                    <RegisterComponent />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
}
const PureLoginRegisterPage = React.memo(LoginRegisterPage);

export { PureLoginRegisterPage as LoginRegisterPage };
