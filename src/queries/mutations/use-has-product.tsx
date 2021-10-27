import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { mutationEndPoints } from '@/utils/api/mutation-endpoints';
import { useAlert } from '@/utils/hooks';
import { IExceptionResponse } from '@/utils/api/api-models';

async function hasProduct(barcode: string) {
  return mutationEndPoints.hasProduct(barcode);
}

export const useHasProduct = () => {
  const { t } = useTranslation();
  const alert = useAlert();

  return useMutation((barcode: string) => hasProduct(barcode), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
