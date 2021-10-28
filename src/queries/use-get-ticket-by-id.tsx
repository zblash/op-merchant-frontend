import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';
import { IExceptionResponse } from '@/utils/api/api-models';

async function getTicketById(id: string) {
  return queryEndpoints.getTicketById({ id });
}

export const useGetTicketById = (ticketId: string) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['ticket-by-id', ticketId], () => getTicketById(ticketId), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
