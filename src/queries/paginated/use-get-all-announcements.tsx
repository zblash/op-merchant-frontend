import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, paginatedQueryEndpoints, useAlert } from '@zblash/op-web-fronted';

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
