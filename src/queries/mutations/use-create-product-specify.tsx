import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { mutationEndPoints } from '@/utils/api/mutation-endpoints';
import { ISpecifyProductRequest, ISpecifyProductResponse } from '@/utils/api/api-models';
import { useAlert } from '@/utils/hooks';

async function createProductSpecify(input: ISpecifyProductRequest) {
  return mutationEndPoints.createSpecifyProductForAuthUser(input);
}

export const useCreateProductSpecify = () => {
  const { t } = useTranslation();
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation((input: ISpecifyProductRequest) => createProductSpecify(input), {
    onSuccess: (data: ISpecifyProductResponse) => {
      queryClient.invalidateQueries('all-product-specifies');
    },
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
  });
};
