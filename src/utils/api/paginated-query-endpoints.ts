import {
  IOrder,
  ISpecifyProductResponse,
  IPaginationWrapper,
  TOrderStatus,
  IProductResponse,
  IAnnouncement,
  ITicketResponse,
  IUserCreditResponse,
  ActivityType,
  ICreditActivityResponse,
} from './api-models';
import { ApiCall, ApiCallService } from './ApiCall';
import { IObligationActivityResponse, IObligationTotals } from '~/services/helpers/backend-models';

export type GetCategoriesVariables = { type: 'sub' | 'parent' | 'all' };

class PaginatedQueryEndpoints {
  getAllSpecifyProductsByProductId: (s: {
    productId: string;
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
    userId?: string;
  }) => Promise<IPaginationWrapper<ISpecifyProductResponse>> = ({ productId, pageNumber, userId, sortBy, sortType }) =>
    ApiCallService.request(
      new (ApiCall as any)()
        .setUrl(`/products/${productId}/specifies`, true)
        .setData({ pageNumber, userId, sortBy, sortType })
        .get(),
    );

  getAllProducts: (variables: {
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
    userId?: string;
    categoryId?: string;
  }) => Promise<IPaginationWrapper<IProductResponse>> = ({ pageNumber, sortBy, sortType, userId }) =>
    ApiCallService.request(
      new (ApiCall as any)()
        .setUrl(`/products`, true)
        .setData({ pageNumber, sortBy, sortType, userId })
        .get(),
    );

  getAllProductsByCategoryId: (s: {
    categoryId: string;
    pageNumber: number;
    userId?: string;
  }) => Promise<IPaginationWrapper<IProductResponse>> = ({ categoryId, pageNumber, userId }) =>
    ApiCallService.request(
      new (ApiCall as any)()
        .setUrl(`/products/category/${categoryId}`, true)
        .setData({ pageNumber, userId })
        .get(),
    );

  getAllOrders: (s: {
    userId?: string;
    userName?: string;
    startDate?: string;
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
    status?: TOrderStatus;
  }) => Promise<IPaginationWrapper<IOrder>> = ({
    userId,
    userName,
    startDate,
    pageNumber,
    sortBy,
    sortType,
    status,
  }) => {
    return ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/orders', true)
        .setData({ pageNumber, sortBy, sortType, userId, userName, startDate, status })
        .get(),
    );
  };

  getAllSpecifies: (s: {
    productId?: string;
    userId?: string;
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
  }) => Promise<IPaginationWrapper<ISpecifyProductResponse>> = ({ userId, pageNumber, sortBy, sortType }) => {
    return ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/products/specify', true)
        .setData({ pageNumber, sortBy, sortType })
        .get(),
    );
  };

  getAllAnnouncements: (s: { pageNumber: number }) => Promise<IPaginationWrapper<IAnnouncement>> = ({ pageNumber }) =>
    ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/announcements/all', true)
        .setData({ pageNumber })
        .get(),
    );

  getAllTickets: (s: {
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
  }) => Promise<IPaginationWrapper<ITicketResponse>> = ({ ...params }) =>
    ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/tickets', true)
        .setData(params)
        .get(),
    );

  getAllUserCredits: (s: {
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
    userName?: string;
    userId?: string;
  }) => Promise<IPaginationWrapper<IUserCreditResponse>> = ({ pageNumber, sortBy, sortType, userName, userId }) =>
    ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/credits', true)
        .setData({ pageNumber, sortBy, sortType, userName, userId })
        .get(),
    );

  getAllUsersCreditActivities: (s: {
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
    startDate?: string;
    lastDate?: string;
    userId?: string;
    activityType?: ActivityType;
  }) => Promise<IPaginationWrapper<ICreditActivityResponse>> = ({ ...params }) =>
    ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/credits/activities', true)
        .setData(params)
        .get(),
    );

  getAllObligationActivities: (s: {
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
    userId?: string;
  }) => Promise<IPaginationWrapper<IObligationActivityResponse>> = ({ userId, pageNumber, sortBy, sortType }) => {
    return ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/obligations/activities', true)
        .setData({ pageNumber, sortBy, sortType })
        .get(),
    );
  };

  getAllObligations: (s: {
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
  }) => Promise<IPaginationWrapper<IObligationTotals>> = ({ pageNumber, sortBy, sortType }) => {
    return ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/obligations', true)
        .setData({ pageNumber, sortBy, sortType })
        .get(),
    );
  };
}
const paginatedQueryEndpoints = new PaginatedQueryEndpoints();

export { paginatedQueryEndpoints };
