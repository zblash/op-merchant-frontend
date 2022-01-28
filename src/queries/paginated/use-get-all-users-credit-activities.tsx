import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { ActivityType, IExceptionResponse, paginatedQueryEndpoints, useAlert } from '@zblash/op-web-fronted';

export interface UseGetAllUserCreditActivitiesProps {
  pageNumber: number;
  sortBy?: string;
  sortType?: string;
  startDate?: string;
  lastDate?: string;
  userId?: string;
  activityType?: ActivityType;
}

async function getAllUsersCreditActivities(s: UseGetAllUserCreditActivitiesProps) {
  return paginatedQueryEndpoints.getAllUsersCreditActivities(s);
}

export const useGetAllUsersCreditActivities = (s: UseGetAllUserCreditActivitiesProps) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(
    [
      'all-users-credit-activities',
      s.pageNumber,
      s.sortBy,
      s.sortType,
      s.userId,
      s.activityType,
      s.startDate,
      s.lastDate,
    ],
    () => getAllUsersCreditActivities(s),
    {
      onError: (error: IExceptionResponse) => {
        alert.show(`${t(`${error.message}`)}`, {
          type: 'error',
        });
      },
    },
  );
};
