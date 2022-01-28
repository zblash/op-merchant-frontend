import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import {
  mutationEndPoints,
  IExceptionResponse,
  ISpecifyProductRequest,
  ISpecifyProductResponse,
  useAlert,
} from '@zblash/op-web-fronted';

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
      queryClient.invalidateQueries('all-products-by-user');
      alert.show(`${t('Ürün Tanımı Başarıyla Oluşturuldu')}`, {
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
