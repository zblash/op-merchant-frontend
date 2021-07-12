import { User } from '@/services/helpers/maps';
import { IUserCommonResponse, IAddressStateResponse } from '@/services/helpers/backend-models';

export interface ApplicationContextValues {
  user: User;

  setUserActiveState: (activeState: IAddressStateResponse[]) => void;
}

export const applicationContextInitialValue: ApplicationContextValues = {
  user: {
    name: '',
    email: '',
    id: '',
    role: 'ADMIN',
    username: '',
    isAdmin: false,
    isCustomer: false,
    isMerchant: false,
    status: false,
    taxNumber: 'TR123',
    activeStates: [],
    address: {
      cityName: '',
      cityId: '',
      stateId: '',
      stateName: '',
      details: '',
      id: '',
    },
  },
  setUserActiveState: () => {},
};

export interface ApplicationProviderProps {
  user: IUserCommonResponse;
}
