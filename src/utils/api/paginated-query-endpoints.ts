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
  IObligationTotals,
  IObligationActivityResponse,
  IUserCommonResponse,
} from './api-models';
import { ApiCall, ApiCallService } from './ApiCall';

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
        .setParams({ pageNumber, userId, sortBy, sortType })
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
        .setParams({ pageNumber, sortBy, sortType, userId })
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
        .setParams({ pageNumber, userId })
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
        .setParams({ pageNumber, sortBy, sortType, userId, userName, startDate, status })
        .get(),
    );
  };

  getAllSpecifies: (s: {
    productId?: string;
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
  }) => Promise<IPaginationWrapper<ISpecifyProductResponse>> = ({ pageNumber, sortBy, sortType }) => {
    return ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/products/specify', true)
        .setParams({ pageNumber, sortBy, sortType })
        .get(),
    );
  };

  getAllAnnouncements: (s: { pageNumber: number }) => Promise<IPaginationWrapper<IAnnouncement>> = ({ pageNumber }) =>
    ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/announcements/all', true)
        .setParams({ pageNumber })
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
        .setParams(params)
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
        .setParams({ pageNumber, sortBy, sortType, userName, userId })
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
        .setParams(params)
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
        .setParams({ pageNumber, sortBy, sortType })
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
        .setParams({ pageNumber, sortBy, sortType })
        .get(),
    );
  };

  getAllCustomers: (s: {
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
  }) => Promise<IPaginationWrapper<IUserCommonResponse>> = ({ pageNumber, sortBy, sortType }) => {
    return ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/customers', true)
        .setParams({ pageNumber, sortBy, sortType })
        .get(),
    );
  };
}
const paginatedQueryEndpoints = new PaginatedQueryEndpoints();

export { paginatedQueryEndpoints };
