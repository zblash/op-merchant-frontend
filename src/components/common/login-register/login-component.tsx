import * as React from 'react';
import { useForm } from 'react-hook-form';
import styled, { colors } from '~/styled';
import { UIButton, Loading } from '~/components/ui';
import { useLoginMutation, LoginInputType } from '~/queries/auth/use-login';
import Input from '~/components/ui/ui-input';
import PasswordInput from '~/components/ui/password-input';
/*
  LoginComponent Helpers
*/
interface LoginComponentProps {}

/*
  LoginComponent Colors // TODO : move theme.json
*/

const LoginComponentColors = {
  primary: '#0075ff',
  wrapperBackground: '#fff',
  unFocused: '#797979',
  danger: '#e2574c',
  dangerDark: '#e2574c',
  primaryDark: '#0062d4',
  white: '#fff',
};

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

const StyledLoginButton = styled(UIButton)<{ hasError: boolean }>`
  display: flex;
  width: 100px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => (props.hasError ? colors.danger : colors.primary)};
  background-color: ${LoginComponentColors.white};
  color: ${props => (props.hasError ? colors.danger : colors.primary)};
  text-align: center;
  cursor: pointer;
  padding: 4px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
  :hover {
    color: ${colors.white};
    background-color: ${props => (props.hasError ? colors.danger : colors.primary)};
  }
  :active {
    background-color: ${props => (props.hasError ? colors.dangerDark : colors.primaryDark)};
  }
  transition: background-color 0.3s, color 0.3s;
`;

const StyledBottomWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 24px;
`;

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
      <StyledBottomWrapper>
        <StyledLoginButton
          hasError={errors.password?.message !== undefined || errors.username?.message !== undefined}
          type="submit"
        >
          {isLoading ? <Loading color="currentColor" size={24} /> : LoginComponentStrings.login}
        </StyledLoginButton>
      </StyledBottomWrapper>
    </form>
  );
};

export { LoginComponent };
