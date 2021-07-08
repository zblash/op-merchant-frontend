import { ApiCall } from '~/services/api';
import {
  IProductResponse,
  IOrder,
  IUserCommonResponse,
  IAddressStateResponse,
  ISpecifyProductResponse,
  TOrderStatus,
  ITicketResponse,
  ITicketReplyResponse,
  IOrderConfirmItem,
  IUserCreditResponse,
  CreditPaymentType,
  ISpecifyProductRequest,
  IProductRequest,
  DaysOfWeek,
  IShippingDaysResponse,
} from '~/services/helpers/backend-models';

interface CreateCategoryVariables {
  parentId?: string | null;
  name: string;
  isSub: boolean;
  uploadFile: File;
  commission: number;
}

interface UpdateCategoryVariables {
  id: string;
  parentId?: string | null;
  name: string;
  isSub: boolean;
  uploadFile?: null | File;
  commission?: number;
}

class MutationEndpoints {
  createProduct = (params: IProductRequest) => {
    const formData = new FormData();
    Object.keys(params).forEach(key => {
      formData.append(key, params[key]);
    });

    return ApiCall.post('/products', formData);
  };

  hasProduct = (params: { barcode: string }) => {
    return ApiCall.post(`/products/hasProduct/${params.barcode}`).then(data => ({
      id: `has-product-${params.barcode}`,
      hasBarcode: data,
    }));
  };

  createSpecifyProductForAuthUser = (params: ISpecifyProductRequest) =>
    ApiCall.post('/products/specify', { ...params, stateList: params.stateIds, stateIds: undefined });

  updateSpecifyProduct = (params: { id: string; request: ISpecifyProductRequest }) => {
    return ApiCall.put(`/products/specify/${params.id}`, {
      ...params.request,
      stateList: params.request.stateIds,
      stateIds: undefined,
    });
  };

  addActiveStates: (s: { stateIds: string[] }) => Promise<IAddressStateResponse[]> = ({ stateIds }) => {
    return ApiCall.post('/user/activestates', stateIds);
  };

  updateInfos: (params: {
    id?: string;
    address: {
      cityId: string;
      details: string;
      stateId: string;
    };
    email: string;
    name: string;
  }) => Promise<IUserCommonResponse> = (...params) => {
    return ApiCall.put('/user/info', ...params);
  };

  updatePassword: (params: { password: string; passwordConfirmation: string }) => Promise<any> = (...params) =>
    ApiCall.post('/user/changePassword', ...params);

  removeProductSpecify: (s: { id: string }) => Promise<ISpecifyProductResponse> = ({ id }) =>
    ApiCall.delete(`/products/specify/${id}`).then(item => ({ ...item, removed: true }));

  updateOrder: (params: {
    id: string;
    paidPrice?: number;
    status: TOrderStatus;
    paymentType?: CreditPaymentType;
    waybillDate?: string;
  }) => Promise<IOrder> = ({ ...params }) => {
    const { id, ...others } = params;

    return ApiCall.put(`/orders/${params.id}`, { ...others });
  };

  addBarcode: (params: { id: string; barcode: string }) => Promise<IProductResponse> = ({ id, barcode }) =>
    ApiCall.post(`/products/addbarcode/${id}`, { barcode });

  editUserCredit: (params: {
    creditId: string;
    totalDebt: number;
    creditLimit: number;
    customerId: string;
  }) => Promise<IUserCreditResponse> = ({ ...params }) => {
    const { creditId, ...others } = params;

    return ApiCall.put(`/credits/${creditId}`, { ...others });
  };

  createTicket: (params: { title: string; message: string; importanceLevel: string }) => Promise<ITicketResponse> = ({
    ...params
  }) => ApiCall.post('/tickets', { ...params });

  createTicketReply: (params: { id: string; message: string }) => Promise<ITicketReplyResponse> = ({ id, message }) =>
    ApiCall.post(`/tickets/${id}/createreply`, { message });

  orderConfirm: (params: { id: string; items: IOrderConfirmItem[] }) => Promise<IOrder> = ({ id, items }) =>
    ApiCall.post(`/orders/confirm/${id}`, { items });

  createShippingDays: (params: { stateId: string; days: DaysOfWeek[] }) => Promise<IShippingDaysResponse> = ({
    ...params
  }) => ApiCall.post('/shippingDays', { ...params });

  updateShippingDays: (params: { shippingDaysId: string; days: DaysOfWeek[] }) => Promise<IShippingDaysResponse> = ({
    shippingDaysId,
    days,
  }) => ApiCall.put(`/shippingDays/${shippingDaysId}`, { days });
}

const mutationEndPoints = new MutationEndpoints();

export { mutationEndPoints };
