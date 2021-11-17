import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@onlineplasiyer/op-web-fronted';

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
