import * as React from 'react';
import { useHistory } from 'react-router';
import { UIContainer } from '@/components/ui';
import { useAlert } from '@/utils/hooks';
import { useMutation } from '@/services/mutation-context/context';
import { mutationEndPoints } from '@/services/mutation-context/mutation-enpoints';
import { refetchFactory } from '@/services/utils';
import { paginationQueryEndpoints } from '@/services/query-context/pagination-query-endpoints';
import { useLoadingContext } from '@/contexts/loading-context';
/* CreateTicketPage Helpers */
interface CreateTicketPageProps {}

/* CreateTicketPage Constants */

/* CreateTicketPage Styles */

/* CreateTicketPage Component  */
function CreateTicketPage(props: React.PropsWithChildren<CreateTicketPageProps>) {
  /* CreateTicketPage Variables */
  const loading = useLoadingContext();
  const alert = useAlert();
  const routerHistory = useHistory();
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [importanceLevel, setImportanceLevel] = React.useState({
    value: '',
    label: '',
  });
  const importanceLevelOptions = [
    { value: 'LOW', label: 'Dusuk' },
    { value: 'MIDDLE', label: 'Orta' },
    { value: 'URGENT', label: 'Acil' },
  ];
  const { mutation: createTicket } = useMutation(mutationEndPoints.createTicket, {
    variables: {
      message,
      title,
      importanceLevel: importanceLevel.value,
    },
    refetchQueries: [refetchFactory(paginationQueryEndpoints.getAllTickets)],
  });
  /* CreateTicketPage Callbacks */

  const handleSubmit = React.useCallback(() => {
    loading.show();
    createTicket()
      .then(() => {
        loading.hide();
        alert.show('Destek Talebi Olusturuldu', { type: 'success' });
        routerHistory.push('/my-tickets');
      })
      .catch(() => {
        loading.hide();
        alert.show('Destek Talebi Olusturulamadi.', { type: 'error' });
      });
  }, [loading, alert, createTicket, routerHistory]);
  /* CreateTicketPage Lifecycle  */

  return <UIContainer></UIContainer>;
}
const PureCreateTicketPage = React.memo(CreateTicketPage);

export { PureCreateTicketPage as CreateTicketPage };
