import * as React from 'react';
import { useForm } from 'react-hook-form';
import { UIButton, Loading } from '@/components/ui';
import { useLoginMutation, LoginInputType } from '@/queries/mutations/auth/use-login';
import Input from '@/components/ui/ui-input';
import PasswordInput from '@/components/ui/password-input';
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
const LoginComponentStrings = {
  login: 'Giris Yap',
  dontHaveAccountQuestion: 'Hesabin Yokmu ?',
  register: 'Kayit Ol',
};

/*
  LoginComponent Styles
*/

const LoginComponent: React.SFC<LoginComponentProps> = props => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <UIButton type="submit">
          {isLoading ? <Loading color="currentColor" size={24} /> : LoginComponentStrings.login}
        </UIButton>
      </div>
    </form>
  );
};

export { LoginComponent };
