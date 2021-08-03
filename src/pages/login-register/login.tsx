import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Loading, UILink } from '@/components/ui';
import { useLoginMutation, LoginInputType } from '@/queries/mutations/auth/use-login';
import Input from '@/components/ui/ui-input';
import PasswordInput from '@/components/ui/password-input';
import { Button } from 'react-bootstrap';
/*
  LoginComponent Helpers
*/
interface LoginComponentProps {}
/*
  LoginComponent Colors // TODO : move theme.json
*/

/*
  LoginComponent Strings
*/

/*
  LoginComponent Styles
*/
const LoginComponent: React.SFC<LoginComponentProps> = () => {
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

  return (
    <div>
      <form className="w-75 mx-auto mb-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          labelKey="E-posta"
          labelClassName="font-weight-bold"
          type="text"
          className="mb-4"
          variant="solid"
          {...register('username', {
            required: 'Bu Alan Zorunludur.',
          })}
          errorKey={errors.username?.message}
        />
        <PasswordInput
          labelKey="Şifre"
          labelClassName="font-weight-bold"
          className="mb-5"
          errorKey={errors.password?.message}
          {...register('password', {
            required: 'Bu Alan Zorunludur.',
          })}
        />
        <div>
          <Button type="submit" className="w-100">
            {isLoading ? <Loading color="currentColor" size={24} /> : 'Giriş Yap'}
          </Button>
        </div>
      </form>

      <div className="w-75 mx-auto d-flex justify-content-end">
        <UILink className="text-underline" to="/register">
          Şifremi unuttum
        </UILink>
      </div>
    </div>
  );
};

export { LoginComponent };
