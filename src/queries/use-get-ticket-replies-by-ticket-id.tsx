import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { queryEndpoints } from '@/utils/api/query-endpoints';
import { useAlert } from '@/utils/hooks';
import { IExceptionResponse } from '@/utils/api/api-models';

async function getTicketRepliesByTicketId(id: string) {
  return queryEndpoints.getTicketRepliesByTicketId({ id });
}

export const useGetTicketRepliesById = (ticketId: string) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['ticket-replies-by-ticket-id', ticketId], () => getTicketRepliesByTicketId(ticketId), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
