import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useAlert } from '@/utils/hooks';
import { paginatedQueryEndpoints } from '@/utils/api/paginated-query-endpoints';
import { TOrderStatus } from '@/utils/api/api-models';

export interface UseGetAllOrdersProps {
  userId?: string;
  userName?: string;
  startDate?: string;
  pageNumber: number;
  sortBy?: string;
  sortType?: string;
  status?: TOrderStatus;
}

async function getAllOrders(s: UseGetAllOrdersProps) {
  return paginatedQueryEndpoints.getAllOrders(s);
}

export const useGetAllOrders = (s: UseGetAllOrdersProps) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(
    ['all-orders', s.pageNumber, s.sortBy, s.sortType, s.userId, s.userName, s.startDate, s.status],
    () => getAllOrders(s),
    {
      onError: () => {
        alert.show(`${t('forms:login-error')}`, {
          type: 'error',
        });
      },
    },
  );
};
