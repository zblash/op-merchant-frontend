import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { mutationEndPoints } from '@/utils/api/mutation-endpoints';
import { ISpecifyProductRequest, ISpecifyProductResponse } from '@/utils/api/api-models';
import { useAlert } from '@/utils/hooks';

export interface IEditSpecifyProductRequest {
  id: string;
  request: ISpecifyProductRequest;
}

async function editProductSpecify(input: IEditSpecifyProductRequest) {
  return mutationEndPoints.updateSpecifyProduct(input);
}

export const useEditProductSpecify = () => {
  const { t } = useTranslation();
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation((input: IEditSpecifyProductRequest) => editProductSpecify(input), {
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
