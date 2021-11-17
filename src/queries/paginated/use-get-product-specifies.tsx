import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, paginatedQueryEndpoints, useAlert } from '@onlineplasiyer/op-web-fronted';

export interface UseGetProductSpecifiesProps {
  productId?: string;
  pageNumber: number;
  sortBy?: string;
  sortType?: string;
}

async function getProductSpecifies(s: UseGetProductSpecifiesProps) {
  return s.productId
    ? paginatedQueryEndpoints.getAllSpecifyProductsByProductId({
        productId: s.productId,
        pageNumber: s.pageNumber,
        sortBy: s.sortBy,
        sortType: s.sortType,
      })
    : paginatedQueryEndpoints.getAllSpecifies({
        pageNumber: s.pageNumber,
        sortBy: s.sortBy,
        sortType: s.sortType,
      });
}

export const useGetProductSpecifies = (s: UseGetProductSpecifiesProps) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(
    ['all-product-specifies', s.pageNumber, s.sortBy, s.sortType, s.productId],
    () => getProductSpecifies(s),
    {
      onError: (error: IExceptionResponse) => {
        alert.show(`${t(`${error.message}`)}`, {
          type: 'error',
        });
      },
    },
  );
};
