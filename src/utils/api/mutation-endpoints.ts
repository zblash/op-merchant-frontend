import {
  ILoginResponse,
  IAddressStateResponse,
  IUserCommonResponse,
  ISpecifyProductResponse,
  TOrderStatus,
  CreditPaymentType,
  IOrder,
  IProductResponse,
  IUserCreditResponse,
  ITicketResponse,
  ITicketReplyResponse,
  DaysOfWeek,
  IShippingDaysResponse,
  IOrderConfirmItem,
  ISpecifyProductRequest,
  IProductRequest,
  IRegisterResponse,
  IRegisterRequest,
} from './api-models';
import { ApiCallService, ApiCall } from './ApiCall';

class MutationEndpoints {
  login: (s: { username: string; password: string }) => Promise<ILoginResponse> = ({ username, password }) => {
    ApiCallService.unRegisterAuthToken();

    return ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/merchant/login', false)
        .setData({ username, password })
        .post(),
    );
  };

  register: (s: IRegisterRequest) => Promise<IRegisterResponse> = ({
    cityId,
    stateId,
    details,
    name,
    username,
    email,
    password,
    taxNumber,
    phoneNumber,
    activeStates,
  }) => {
    return ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/merchant/register', false)
        .setData({
          cityId,
          stateId,
          details,
          name,
          username,
          email,
          password,
          taxNumber,
          phoneNumber,
          activeStates,
        })
        .post(),
    );
  };

  createProduct = (params: IProductRequest) => {
    const formData = new FormData();
    Object.keys(params).forEach(key => {
      formData.append(key, params[key]);
    });

    return ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/products')
        .setData(formData)
        .post(),
    );
  };

  hasProduct = (barcode: string) => {
    return ApiCallService.request(new (ApiCall as any)().setUrl(`/products/hasProduct/${barcode}`).post());
  };

  createSpecifyProductForAuthUser = (params: ISpecifyProductRequest) =>
    ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/products/specify')
        .setData({ ...params, stateList: params.stateIds, stateIds: undefined })
        .post(),
    );

  updateSpecifyProduct = (params: { id: string; request: ISpecifyProductRequest }) => {
    return ApiCallService.request(
      new (ApiCall as any)()
        .setUrl(`/products/specify/${params.id}`)
        .setData({ ...params.request, stateList: params.request.stateIds, stateIds: undefined })
        .put(),
    );
  };

  addActiveStates: (s: { stateIds: string[] }) => Promise<IAddressStateResponse[]> = ({ stateIds }) => {
    return ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/user/activestates')
        .setData(stateIds)
        .post(),
    );
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
    return ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/user/info')
        .setData(...params)
        .put(),
    );
  };

  updatePassword: (params: { password: string; passwordConfirmation: string }) => Promise<any> = (...params) =>
    ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/user/changePassword')
        .setData(...params)
        .post(),
    );

  removeProductSpecify: (s: { id: string }) => Promise<ISpecifyProductResponse> = ({ id }) =>
    ApiCallService.request(new (ApiCall as any)().setUrl(`/products/specify/${id}`).delete());

  updateOrder: (params: {
    id: string;
    paidPrice?: number;
    status: TOrderStatus;
    paymentType?: CreditPaymentType;
    waybillDate?: string;
  }) => Promise<IOrder> = ({ ...params }) => {
    const { id, ...others } = params;

    return ApiCallService.request(
      new (ApiCall as any)()
        .setUrl(`/orders/${params.id}`)
        .setData({ ...others })
        .put(),
    );
  };

  addBarcode: (params: { id: string; barcode: string }) => Promise<IProductResponse> = ({ id, barcode }) =>
    ApiCallService.request(
      new (ApiCall as any)()
        .setUrl(`/products/addbarcode/${id}`)
        .setData({ barcode })
        .post(),
    );

  editUserCredit: (params: {
    creditId: string;
    totalDebt: number;
    creditLimit: number;
    customerId: string;
  }) => Promise<IUserCreditResponse> = ({ ...params }) => {
    const { creditId, ...others } = params;

    return ApiCallService.request(
      new (ApiCall as any)()
        .setUrl(`/credits/${creditId}`)
        .setData({ ...others })
        .put(),
    );
  };

  createTicket: (params: { title: string; message: string; importanceLevel: string }) => Promise<ITicketResponse> = ({
    ...params
  }) =>
    ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/tickets')
        .setData({ ...params })
        .post(),
    );

  createTicketReply: (params: { id: string; message: string }) => Promise<ITicketReplyResponse> = ({ id, message }) =>
    ApiCallService.request(
      new (ApiCall as any)()
        .setUrl(`/tickets/${id}/createreply`)
        .setData({ message })
        .post(),
    );

  orderConfirm: (params: { id: string; items: IOrderConfirmItem[] }) => Promise<IOrder> = ({ id, items }) =>
    ApiCallService.request(
      new (ApiCall as any)()
        .setUrl(`/orders/confirm/${id}`)
        .setData({ items })
        .post(),
    );

  createShippingDays: (params: { stateId: string; days: DaysOfWeek[] }) => Promise<IShippingDaysResponse> = ({
    ...params
  }) =>
    ApiCallService.request(
      new (ApiCall as any)()
        .setUrl('/shippingDays')
        .setData({ ...params })
        .post(),
    );

  updateShippingDays: (params: { shippingDaysId: string; days: DaysOfWeek[] }) => Promise<IShippingDaysResponse> = ({
    shippingDaysId,
    days,
  }) =>
    ApiCallService.request(
      new (ApiCall as any)()
        .setUrl(`/shippingDays/${shippingDaysId}`)
        .setData({ days })
        .put(),
    );
}

const mutationEndPoints = new MutationEndpoints();

export { mutationEndPoints };
