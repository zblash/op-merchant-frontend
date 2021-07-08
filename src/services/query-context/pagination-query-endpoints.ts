import { ApiCall } from '~/services/api';
import {
  IProductResponse,
  ISpecifyProductResponse,
  IOrder,
  IAnnouncement,
  ITicketResponse,
  ICreditActivityResponse,
  IObligationActivityResponse,
  IObligationTotals,
  IUserCreditResponse,
  ActivityType,
  TOrderStatus,
} from '~/services/helpers/backend-models';

function paginationQueryGet(route: string, variables: any) {
  return ApiCall.get(route, variables).then(data => ({
    ...data,
    values: data.values.map(item => ({ ...item, pageIndex: variables.pageNumber })),
  }));
}

class QueryEndpoints {
  getAllSpecifyProductsByProductId: (s: {
    productId: string;
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
    userId?: string;
  }) => Promise<ISpecifyProductResponse> = ({ productId, pageNumber, userId, sortBy, sortType }) =>
    paginationQueryGet(`/products/${productId}/specifies`, { pageNumber, userId, sortBy, sortType });

  getAllProducts: (variables: {
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
    userId?: string;
    categoryId?: string;
  }) => Promise<IProductResponse> = ({ pageNumber, sortBy, sortType, userId }) =>
    paginationQueryGet(`/products`, { pageNumber, sortBy, sortType, userId });

  getAllProductsByCategoryId: (s: {
    categoryId: string;
    pageNumber: number;
    userId?: string;
  }) => Promise<IProductResponse> = ({ categoryId, pageNumber, userId }) =>
    paginationQueryGet(`/products/category/${categoryId}`, { pageNumber, userId });

  getAllOrders: (s: {
    userId?: string;
    userName?: string;
    startDate?: string;
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
    status?: TOrderStatus;
  }) => Promise<IOrder> = ({ userId, userName, startDate, pageNumber, sortBy, sortType, status }) => {
    return paginationQueryGet('/orders', { pageNumber, sortBy, sortType, userId, userName, startDate, status });
  };

  getAllSpecifies: (s: {
    productId?: string;
    userId?: string;
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
  }) => Promise<ISpecifyProductResponse> = ({ userId, pageNumber, sortBy, sortType }) => {
    return paginationQueryGet('/products/specify', { pageNumber, sortBy, sortType });
  };

  getAllAnnouncements: (s: { pageNumber: number }) => Promise<IAnnouncement> = ({ pageNumber }) =>
    paginationQueryGet(`/announcements/all`, { pageNumber });

  getAllTickets: (s: { pageNumber: number; sortBy?: string; sortType?: string }) => Promise<ITicketResponse> = ({
    ...params
  }) => paginationQueryGet('/tickets', params);

  getAllUserCredits: (s: {
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
    userName?: string;
    userId?: string;
  }) => Promise<IUserCreditResponse> = ({ pageNumber, sortBy, sortType, userName, userId }) =>
    paginationQueryGet('/credits', { pageNumber, sortBy, sortType, userName, userId });

  getAllUsersCreditActivities: (s: {
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
    startDate?: string;
    lastDate?: string;
    userId?: string;
    activityType?: ActivityType;
  }) => Promise<ICreditActivityResponse> = ({ ...params }) => paginationQueryGet('/credits/activities', params);

  getAllObligationActivities: (s: {
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
    userId?: string;
  }) => Promise<IObligationActivityResponse> = ({ userId, pageNumber, sortBy, sortType }) => {
    return paginationQueryGet('/obligations/activities', { pageNumber, sortBy, sortType });
  };

  getAllObligations: (s: { pageNumber: number; sortBy?: string; sortType?: string }) => Promise<IObligationTotals> = ({
    pageNumber,
    sortBy,
    sortType,
  }) => {
    return paginationQueryGet('/obligations', { pageNumber, sortBy, sortType });
  };
}

const paginationQueryEndpoints = new QueryEndpoints();

export { paginationQueryEndpoints };
