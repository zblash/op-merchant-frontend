import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, paginatedQueryEndpoints, useAlert } from '@zblash/op-web-fronted';

export interface UseGetAllObligationsProps {
  pageNumber: number;
  sortBy?: string;
  sortType?: string;
}

async function getGetAllObligations(s: UseGetAllObligationsProps) {
  return paginatedQueryEndpoints.getAllObligations(s);
}

export const useGetAllObligations = (s: UseGetAllObligationsProps) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['all-obligations', s.pageNumber, s.sortBy, s.sortType], () => getGetAllObligations(s), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
