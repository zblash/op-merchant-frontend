import * as React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { UILink, Loading } from '@/components/ui';
import { useLoginMutation, LoginInputType } from '@/queries/mutations/auth/use-login';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/ui-input';
import PasswordInput from '@/components/ui/password-input';
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
  const { mutate: login, isLoading } = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  function onSubmit({ username, password }: LoginInputType) {
    login({
      username,
      password,
    });
  }
  /* LoginPage Callbacks */

  /* LoginPage Lifecycle  */

  return (
    <Container className="mt-5 page-wrapper">
      <Row className="d-flex justify-content-center">
        <Col lg={6} xl={6} md={10} xs={10} sm={10}>
          <div className="border rounded w-100 py-5">
            <form className="w-75 mx-auto mb-3" onSubmit={handleSubmit(onSubmit)}>
              <Input
                labelKey="forms:label-email"
                type="text"
                variant="solid"
                {...register('username', {
                  required: 'Bu Alan Zorunludur.',
                })}
                errorKey={errors.username?.message}
              />
              <PasswordInput
                labelKey="forms:label-password"
                errorKey={errors.password?.message}
                {...register('password', {
                  required: 'Bu Alan Zorunludur.',
                })}
              />
              <div>
                <Button type="submit">
                  {isLoading ? <Loading color="currentColor" size={24} /> : LoginPageStrings.login}
                </Button>
              </div>
            </form>

            <div className="w-75 mx-auto d-flex justify-content-between">
              <UILink to="/register">{LoginPageStrings.register}</UILink>
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
