import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@/styled';
import { UIContainer } from '@/components/ui';
import { useApplicationContext } from '@/app/context';
import { IAddressCityResponse, IAddressStateResponse } from '@/services/helpers/backend-models';
import { queryEndpoints } from '@/services/query-context/query-endpoints';
import { useMutation } from '@/services/mutation-context/context';
import { mutationEndPoints } from '@/services/mutation-context/mutation-enpoints';
import { useQuery } from '@/services/query-context/context';

/* ProfilePage Helpers */
interface ProfilePageProps {}

/* ProfilePage Constants */

/* ProfilePage Styles */
const StyledProfilePageWrapper = styled.div``;

/* ProfilePage Component  */
function ProfilePage(props: React.PropsWithChildren<ProfilePageProps>) {
  /* ProfilePage Variables */
  const { t } = useTranslation();
  const { user } = useApplicationContext();
  const { data: activeStates } = useQuery(queryEndpoints.getAuthUserActiveStates, {
    defaultValue: [{ cityTitle: '', code: 0, id: '', title: '' }],
    skip: !user.isMerchant,
  });

  const [cities, setCities] = React.useState<IAddressCityResponse[]>([]);
  const [states, setStates] = React.useState<IAddressStateResponse[]>([]);
  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [cityName, setCityName] = React.useState(user.address.cityName);
  const [stateName, setStateName] = React.useState(user.address.stateName);
  const [details, setDetails] = React.useState(user.address.details);
  const [selectedCityId, setSelectedCityId] = React.useState(user.address.cityId);
  const [selectedStateId, setSelectedStateId] = React.useState(user.address.stateId);
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const { mutation: updateUserInfosMutation } = useMutation(mutationEndPoints.updateInfos, {
    variables: {
      email,
      name,
      address: {
        cityId: selectedCityId,
        stateId: selectedStateId,
        details,
      },
    },
  });
  const { mutation: updatePasswordMutation } = useMutation(mutationEndPoints.updatePassword, {
    variables: { password, passwordConfirmation },
  });

  const { data: totalObligation, loading: obligationLoading } = useQuery(queryEndpoints.getObligationTotal, {
    defaultValue: {
      debt: 0.0,
      receivable: 0.0,
    },
  });

  const { data: shippingDays, loading: shippingDaysLoading } = useQuery(queryEndpoints.getShippingDays, {
    defaultValue: [],
  });
  /* ProfilePage Callbacks */

  const handleCityChange = React.useCallback(
    e => {
      setSelectedCityId('');
      setCityName(e);
      setStateName('');
    },
    [setSelectedCityId, setCityName, setStateName],
  );
  const handleUpdateInfos = React.useCallback(
    e => {
      e.preventDefault();
      updateUserInfosMutation();
    },
    [updateUserInfosMutation],
  );
  const handleUpdatePassword = React.useCallback(
    e => {
      e.preventDefault();
      if (password === passwordConfirmation) {
        updatePasswordMutation();
        setPassword('');
        setPasswordConfirmation('');
      }
    },
    [password, passwordConfirmation, updatePasswordMutation, setPassword, setPasswordConfirmation],
  );
  /* ProfilePage Lifecycle  */
  React.useEffect(() => {
    queryEndpoints.getCities().then(citiesResponse => {
      setCities(citiesResponse);
    });
  }, []);
  React.useEffect(() => {
    if (selectedCityId) {
      queryEndpoints.getStatesByCityId({ cityId: selectedCityId }).then(statesResponse => {
        setStates(statesResponse);
      });
    }
  }, [selectedCityId]);

  return (
    <UIContainer>
      <StyledProfilePageWrapper></StyledProfilePageWrapper>
    </UIContainer>
  );
}
const PureProfilePage = React.memo(ProfilePage);

export { PureProfilePage as ProfilePage };
