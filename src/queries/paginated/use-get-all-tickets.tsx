import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, paginatedQueryEndpoints, useAlert } from '@zblash/op-web-fronted';

export interface UseGetAllTicketsProps {
  pageNumber: number;
  sortBy?: string;
  sortType?: string;
}

async function getAllTickets(s: UseGetAllTicketsProps) {
  return paginatedQueryEndpoints.getAllTickets(s);
}

export const useGetAllTickets = (s: UseGetAllTicketsProps) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['all-tickets', s.pageNumber, s.sortBy, s.sortType], () => getAllTickets(s), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
