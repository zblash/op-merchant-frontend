import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useAlert } from '@/utils/hooks';
import { paginatedQueryEndpoints } from '@/utils/api/paginated-query-endpoints';
import { IExceptionResponse } from '@/utils/api/api-models';

export interface UseGetAllMerchantsProps {
  status?: boolean;
  pageNumber: number;
  sortBy?: string;
  sortType?: string;
}

async function getAllMerchants(s: UseGetAllMerchantsProps) {
  return paginatedQueryEndpoints.getAllMerchants(s);
}

export const useGetAllMerchants = (s: UseGetAllMerchantsProps) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['all-merchants', s.pageNumber, s.sortBy, s.sortType, s.status], () => getAllMerchants(s), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
