import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useAlert } from '@/utils/hooks';
import { paginatedQueryEndpoints } from '@/utils/api/paginated-query-endpoints';

export interface UseGetAllCustomersProps {
  pageNumber: number;
  sortBy?: string;
  sortType?: string;
}

async function getAllCustomers(s: UseGetAllCustomersProps) {
  return paginatedQueryEndpoints.getAllCustomers(s);
}

export const useGetAllCustomers = (s: UseGetAllCustomersProps) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['all-customers', s.pageNumber, s.sortBy, s.sortType], () => getAllCustomers(s), {
    onError: () => {
      alert.show(`${t('forms:login-error')}`, {
        type: 'error',
      });
    },
  });
};
