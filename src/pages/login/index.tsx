import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled, { colors, mixins, css, globalStyleCreator } from '~/styled';
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

const CenteredCard = styled.div`
  padding: 70px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(21, 27, 38, 0.15);
  line-height: 1.5;
  ${mixins.mediaBreakpointDown('tablet')} {
    padding: 24px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
const StyledLogo = styled.div`
  background-image: url(${logoPath});
  background-size: 256px;
  background-repeat: no-repeat;
  user-select: none;
  margin: 0 auto 16px auto;
  width: 256px;
  height: 130px;
`;

const StyledDontHaveAccountQuestion = styled.div`
  margin-top: 16px;
`;
const StyledHiglightedText = styled(UILink)`
  background-color: transparent !important;
  color: ${colors.primary};
  float: left;
  padding: 0 !important;
  :hover {
    color: ${colors.primaryDark};
    background-color: transparent !important;
  }
`;
const floatLeft = css`
  float: left;
`;
/* LoginPage Component  */
function LoginPage(props: React.PropsWithChildren<LoginPageProps>) {
  /* LoginPage Variables */
  const GlobalStyle = globalStyleCreator();
  /* LoginPage Callbacks */

  /* LoginPage Lifecycle  */

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col lg={6} xl={6} md={10} xs={10} sm={10}>
          <GlobalStyle />
          <CenteredCard>
            <StyledLogo />
            <LoginComponent />

            <StyledDontHaveAccountQuestion>
              <div className={floatLeft}>{LoginPageStrings.dontHaveAccountQuestion}&nbsp;</div>
              <StyledHiglightedText to="/register">{LoginPageStrings.register}</StyledHiglightedText>
            </StyledDontHaveAccountQuestion>
            <StyledDontHaveAccountQuestion>
              <div className={floatLeft}>Sifrenizi mi unuttunuz?&nbsp;</div>
              <StyledHiglightedText to="/register">Sifre sifirla</StyledHiglightedText>
            </StyledDontHaveAccountQuestion>
          </CenteredCard>
        </Col>
      </Row>
    </Container>
  );
}
const PureLoginPage = React.memo(LoginPage);

export { PureLoginPage as LoginPage };
