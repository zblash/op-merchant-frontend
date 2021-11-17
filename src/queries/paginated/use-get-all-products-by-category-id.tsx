import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, paginatedQueryEndpoints, useAlert } from '@onlineplasiyer/op-web-fronted';

export interface UseGetAllProductsByCategoryIdProps {
  userId?: string;
  categoryId?: string;
  pageNumber: number;
  sortBy?: string;
  sortType?: string;
}

async function getAllProductsByCategoryId(s: UseGetAllProductsByCategoryIdProps) {
  return paginatedQueryEndpoints.getAllProductsByCategoryId(s);
}

export const useGetAllProductsByCategoryId = (s: UseGetAllProductsByCategoryIdProps) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(
    ['all-products-by-category-id', s.pageNumber, s.sortBy, s.sortType, s.userId, s.categoryId],
    () => getAllProductsByCategoryId(s),
    {
      onError: (error: IExceptionResponse) => {
        alert.show(`${t(`${error.message}`)}`, {
          type: 'error',
        });
      },
    },
  );
};
