import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { mutationEndPoints } from '@/utils/api/mutation-endpoints';
import { IProductRequest, IProductResponse } from '@/utils/api/api-models';
import { useAlert } from '@/utils/hooks';

async function createProduct(input: IProductRequest) {
  return mutationEndPoints.createProduct(input);
}

export const useCreateProduct = () => {
  const { t } = useTranslation();
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation((input: IProductRequest) => createProduct(input), {
    onSuccess: (data: IProductResponse) => {
      queryClient.invalidateQueries('all-users-credits');
    },
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
  });
};
