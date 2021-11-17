import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert } from '@onlineplasiyer/op-web-fronted';

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
