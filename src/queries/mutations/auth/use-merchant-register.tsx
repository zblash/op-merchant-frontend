import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import {
  mutationEndPoints,
  IRegisterResponse,
  IRegisterRequest,
  IExceptionResponse,
  useAlert,
} from '@onlineplasiyer/op-web-fronted';

async function register(input: IRegisterRequest) {
  return mutationEndPoints.merchantRegister(input);
}

export const useMerchantRegisterMutation = () => {
  const { t } = useTranslation();
  const alert = useAlert();

  return useMutation((input: IRegisterRequest) => register(input), {
    onSuccess: (data: IRegisterResponse) => {
      alert.show(`${t('Kayıt Işlemi Başarılı')}`, {
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
