import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, paginatedQueryEndpoints, useAlert } from '@onlineplasiyer/op-web-fronted';

export interface UseGetAllObligationActivitiesProps {
  pageNumber: number;
  sortBy?: string;
  sortType?: string;
  userId?: string;
}

async function getGetAllObligationActivities(s: UseGetAllObligationActivitiesProps) {
  return paginatedQueryEndpoints.getAllObligationActivities(s);
}

export const useGetAllObligationActivities = (s: UseGetAllObligationActivitiesProps) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(
    ['all-obligation-activities', s.pageNumber, s.sortBy, s.sortType, s.userId],
    () => getGetAllObligationActivities(s),
    {
      onError: (error: IExceptionResponse) => {
        alert.show(`${t(`${error.message}`)}`, {
          type: 'error',
        });
      },
    },
  );
};
