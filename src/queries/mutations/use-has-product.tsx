import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { mutationEndPoints } from '@/utils/api/mutation-endpoints';
import { useAlert } from '@/utils/hooks';

async function hasProduct(barcode: string) {
  return mutationEndPoints.hasProduct(barcode);
}

export const useHasProduct = () => {
  const { t } = useTranslation();
  const alert = useAlert();

  return useMutation((barcode: string) => hasProduct(barcode), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
  });
};
