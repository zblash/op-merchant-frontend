import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import {
  mutationEndPoints,
  IExceptionResponse,
  ISpecifyProductRequest,
  ISpecifyProductResponse,
  useAlert,
} from '@zblash/op-web-fronted';

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
      queryClient.invalidateQueries(['product-by-id', data.id]);
      alert.show(`${t('Ürün Tanımı Başarıyla Güncellendi')}`, {
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
