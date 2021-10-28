import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useAlert } from '@/utils/hooks';
import { paginatedQueryEndpoints } from '@/utils/api/paginated-query-endpoints';
import { IExceptionResponse } from '@/utils/api/api-models';

export interface UseGetAllAnnouncementsProps {
  pageNumber: number;
}

async function getAllAnnouncements(s: UseGetAllAnnouncementsProps) {
  return paginatedQueryEndpoints.getAllAnnouncements(s);
}

export const useGetAllAnnouncements = (s: UseGetAllAnnouncementsProps) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(['all-announcements', s.pageNumber], () => getAllAnnouncements(s), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
