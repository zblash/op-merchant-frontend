import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logoPath from '~/assets/images/logo/logo.png';
import { UILink } from '~/components/ui';
import { LoginComponent } from '~/components/common/login-register/login-component';
/* LoginPage Helpers */
interface LoginPageProps {}

/* LoginPage Constants */
const LoginPageStrings = {
  login: 'Giris Yap',
  dontHaveAccountQuestion: 'Hesabin Yokmu ?',
  haveAccountQuestion: 'Hesabin Varmi ?',
  register: 'Kayit Ol',
};

/* LoginPage Component  */
function LoginPage(props: React.PropsWithChildren<LoginPageProps>) {
  /* LoginPage Variables */

  /* LoginPage Callbacks */

  /* LoginPage Lifecycle  */

  return (
    <Container className="mt-5 page-wrapper">
      <Row className="d-flex justify-content-center">
        <Col lg={6} xl={6} md={10} xs={10} sm={10}>
          <div className="border">
            <div />
            <LoginComponent />

            <div>
              <div>{LoginPageStrings.dontHaveAccountQuestion}&nbsp;</div>
              <UILink to="/register">{LoginPageStrings.register}</UILink>
            </div>
            <div>
              <div>Sifrenizi mi unuttunuz?&nbsp;</div>
              <UILink to="/register">Sifre sifirla</UILink>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
const PureLoginPage = React.memo(LoginPage);

export { PureLoginPage as LoginPage };
