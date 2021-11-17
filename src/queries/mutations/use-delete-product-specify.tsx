import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import {
  mutationEndPoints,
  IExceptionResponse,
  ISpecifyProductResponse,
  useAlert,
} from '@onlineplasiyer/op-web-fronted';

async function deleteProductSpecify(id: string) {
  return mutationEndPoints.removeProductSpecify({ id });
}

export const useDeleteProductSpecify = () => {
  const { t } = useTranslation();
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteProductSpecify(id), {
    onSuccess: (data: ISpecifyProductResponse) => {
      queryClient.invalidateQueries('all-product-specifies');
      alert.show(`${t('Ürün Tanımı Başarıyla Kaldırıldı')}`, {
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
