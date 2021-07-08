import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAuth } from '~/contexts/auth-context';
import { mutationEndPoints } from '~/utils/api/mutation-endpoints';
import { ILoginResponse } from '~/utils/api/api-models';
import { useWindowSize } from '~/utils/ui/use-window-size';

export interface LoginInputType {
  username: string;
  password: string;
}
async function login(input: LoginInputType) {
  return mutationEndPoints.login({
    username: input.username,
    password: input.password,
  });
}

export const useLoginMutation = () => {
  const { authenticate } = useAuth();
  const { t } = useTranslation();
  const { width } = useWindowSize();

  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: (data: ILoginResponse) => {
      authenticate(data.accessToken);
    },
    onError: () => {
      toast(`${t('forms:login-error')}`, {
        type: 'error',
        progressClassName: 'fancy-progress-bar',
        position: width > 768 ? 'bottom-right' : 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });
};
