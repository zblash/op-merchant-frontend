import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/auth-context';
import { mutationEndPoints } from '@/utils/api/mutation-endpoints';
import { IExceptionResponse, ILoginResponse } from '@/utils/api/api-models';
import { useAlert } from '@/utils/hooks';

export interface LoginInputType {
  username: string;
  password: string;
}
async function login(input: LoginInputType) {
  return mutationEndPoints.merchantLogin({
    username: input.username,
    password: input.password,
  });
}

export const useMerchantLoginMutation = () => {
  const { authenticate } = useAuth();
  const { t } = useTranslation();
  const alert = useAlert();

  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: (data: ILoginResponse) => {
      authenticate(data.accessToken);
      alert.show(`${t('Başarıyla Giriş Yapıldı')}`, {
        type: 'success',
      });
    },
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
