import axios from 'axios';
import { ApiCall, URL } from '@/services/api';
import {
  ICategoryResponse,
  IProductResponse,
  IUserCommonResponse,
  IAddressStateResponse,
  IAddressCityResponse,
  IObligationTotals,
  IAnnouncement,
  IOrder,
  IOrderSummary,
  ISpecifyProductResponse,
  INotificationResponse,
  ITicketResponse,
  ITicketReplyResponse,
  IUserCreditResponse,
  IShippingDaysResponse,
} from '@/services/helpers/backend-models';

export type GetCategoriesVariables = { type: 'sub' | 'parent' | 'all' };

class QueryEndpoints {
  getCategories: (s: GetCategoriesVariables) => Promise<ICategoryResponse[]> = ({ type }) =>
    ApiCall.get(`/categories`, {
      filter: type !== 'all',
      sub: type === 'sub',
    });

  getParentCategories: () => Promise<ICategoryResponse[]> = () =>
    ApiCall.get(`/categories`, {
      filter: true,
      sub: false,
    });

  getSubCategoriesByParentId: (s: { parentId: string }) => Promise<ICategoryResponse[]> = ({ parentId }) =>
    ApiCall.get(`/categories/${parentId}/subCategories`);

  getCategoryByID: (s: { id: string }) => Promise<ICategoryResponse> = ({ id }) => ApiCall.get(`/categories/${id}`);

  getProductByBarcode: (s: { barcode: string }) => Promise<IProductResponse> = ({ barcode }) =>
    ApiCall.get(`/products/barcode/${barcode}`);

  getProductById: (s: { id: string }) => Promise<IProductResponse> = ({ id }) => ApiCall.get(`/products/${id}`);

  getProductSpecifyById: (s: { id: string }) => Promise<ISpecifyProductResponse> = ({ id }) =>
    ApiCall.get(`/products/specify/${id}`);

  getCustomers: () => Promise<IUserCommonResponse[]> = () => ApiCall.get('/customers');

  getAuthUserActiveStates: () => Promise<IAddressStateResponse[]> = () => ApiCall.get('/user/activeStates');

  getCities: () => Promise<IAddressCityResponse[]> = () =>
    axios.get(URL.concat('/definitions/cities')).then(({ data }) => data);

  getStatesByCityId: (s: { cityId: string }) => Promise<IAddressStateResponse[]> = ({ cityId }) =>
    axios.get(URL.concat(`/definitions/cities/${cityId}/states`)).then(({ data }) => data);

  getStates: () => Promise<any> = () => axios.get(URL.concat('/definitions/states')).then(({ data }) => data);

  getObligationTotal: () => Promise<IObligationTotals> = () => {
    return ApiCall.get('/obligations/totals');
  };

  getAnnouncements: () => Promise<Array<IAnnouncement>> = () => ApiCall.get('/announcements');

  getOrder: (s: { id: string }) => Promise<IOrder> = ({ id }) => ApiCall.get(`/orders/${id}`);

  getOrderSummary: () => Promise<IOrderSummary> = () => ApiCall.get('/orders/summary');

  getAllUsersNotifications: () => Promise<Array<INotificationResponse>> = () => ApiCall.get('/notifications/my');

  getProductsByFilter: (s: { name: string }) => Promise<Array<IProductResponse>> = ({ name }) =>
    ApiCall.get(`/products/filter?name=${name}`);

  getTicketById: (s: { id: string }) => Promise<ITicketResponse> = ({ id }) => ApiCall.get(`/tickets/${id}`);

  getTicketRepliesByTicketId: (s: { id: string }) => Promise<Array<ITicketReplyResponse>> = ({ id }) =>
    ApiCall.get(`/tickets/${id}/replies`);

  getAllProducts: (s: { userId?: string }) => Promise<Array<IProductResponse>> = ({ userId }) => {
    return ApiCall.get('/products/byUser', { userId });
  };

  getUsersCreditByUser: (s: { userId: string }) => Promise<IUserCreditResponse> = ({ userId }) => {
    return ApiCall.get(`/credits/byUser/${userId}`);
  };

  getShippingDays: () => Promise<Array<IShippingDaysResponse>> = () => ApiCall.get('/shippingDays');

  getAllowedStateForShippingDays: () => Promise<Array<IAddressStateResponse>> = () =>
    ApiCall.get('/shippingDays/allowedStates');
}
const queryEndpoints = new QueryEndpoints();

export { queryEndpoints };
