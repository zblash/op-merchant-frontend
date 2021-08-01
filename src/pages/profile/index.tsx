import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { colors, css } from '@/styled';
import { Container, UIAutoComplete, UIInput, UIButton } from '@/components/ui';
import { ObligationComponent } from '@/components/page-components/obligation';
import { useApplicationContext } from '@/app/context';
import { IAddressCityResponse, IAddressStateResponse } from '@/services/helpers/backend-models';
import { queryEndpoints } from '@/services/query-context/query-endpoints';
import { useMutation } from '@/services/mutation-context/context';
import { mutationEndPoints } from '@/services/mutation-context/mutation-enpoints';
import { usePopupContext } from '@/contexts/popup/context';
import { useQuery } from '@/services/query-context/context';

/* ProfilePage Helpers */
interface ProfilePageProps {}

/* ProfilePage Constants */

/* ProfilePage Styles */
const StyledProfilePageWrapper = styled.div``;
const StyledActiveStatesWrapper = styled.div`
width:60%;
float:left;
border:1px solid ${colors.lightGray}
border-radius:8px;
background-color:${colors.white}
padding-bottom: 15px;
margin-bottom: 25px;
`;
const StyledInfosFormWrapper = styled.div`
  width:60%;
  float:left;
  border:1px solid ${colors.lightGray}
  border-radius:8px;
  background-color:${colors.white}
  `;
const StyledInfosFormHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${colors.lightGray};
`;
const StyledActiveStatesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1% 0 1%;
  border-bottom: 1px solid ${colors.lightGray};
`;
const StyledActiveStatesContentWrapper = styled.div`
  padding: 15px 1%;
`;
const StyledInfosForm = styled.div`
  padding-left: 1%;
  padding-right: 1%;
  padding-top: 15px;
`;
const StyledInfosFormElementWrapper = styled.div`
  width: 98%;
  float: left;
  padding-left: 1%;
  padding-right: 1%;
  margin-bottom: 15px;
`;
const StyledInput = styled(UIInput)`
  width: 100%;
  border: 2px solid ${colors.lightGray};
  border-radius: 5px;
  height: 35px;
  border: 2px solid ${colors.lightGray};
  border-radius: 5px;
  color: ${colors.lightGray} !important;
  padding-left: 4px;
`;
const StyledInfosFormButton = styled(UIButton)`
  display: flex;
  float: right;
  align-items: center;
  transition: background-color 0.3s;
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 4px 8px;
  border-radius: 8px;
  :active {
    background-color: ${colors.primaryDark} !important;
  }
  :hover {
    background-color: ${colors.lightGray};
  }
`;
const StyledPasswordResetWrapper = styled.div`
  width: 33.33%;
  float: right;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  background-color: #ffffff;
  margin-top: 10px;
`;
const StyledShippingDaysWrapper = styled.div`
  width: 60%;
  float: left;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  background-color: #ffffff;
  margin-bottom: 15px;
`;
const StyledShippingDaysTable = styled.table`
  width: 90%;
  margin: 0 auto;
  > tr > th,
  td {
    border-bottom: 1px solid ${colors.lightGray};
    text-align: center;
    padding: 8px;
  }
`;
const StyledActiveStatesContentCityWrapper = styled.div`
  width: 50%;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  border-bottom: 1px solid ${colors.lightGray};
`;
const StyledDayEditButton = styled(UIButton)``;
const headerLink = css`
  color: ${colors.primary};
  cursor: pointer;
`;
const marginZero = css`
  margin: 0;
`;
/* ProfilePage Component  */
function ProfilePage(props: React.PropsWithChildren<ProfilePageProps>) {
  /* ProfilePage Variables */
  const { t } = useTranslation();
  const { user } = useApplicationContext();
  const { data: activeStates } = useQuery(queryEndpoints.getAuthUserActiveStates, {
    defaultValue: [{ cityTitle: '', code: 0, id: '', title: '' }],
    skip: !user.isMerchant,
  });
  const popups = usePopupContext();
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

  const handleNewActiveStateClick = React.useCallback(() => {
    popups.addActiveState.show();
  }, [popups.addActiveState]);

  const handleNewShippingDaysClick = React.useCallback(() => {
    popups.addShippingDays.show();
  }, [popups.addShippingDays]);

  const handleDayEditClick = React.useCallback(
    (dayStateName, id) => {
      popups.editShippingDays.show({ stateName: dayStateName, id });
    },
    [popups.editShippingDays],
  );

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
    <Container>
      <StyledProfilePageWrapper>
        <StyledActiveStatesWrapper>
          <StyledActiveStatesHeader>
            <h3>Urun Ekleyebileceginiz Bolgeler</h3>
            <p className={headerLink} onClick={handleNewActiveStateClick}>
              Yeni Bolge Ekle
            </p>
          </StyledActiveStatesHeader>
          <StyledActiveStatesContentWrapper>
            <StyledActiveStatesContentCityWrapper>
              <h3 className={marginZero}>Sehir</h3>
            </StyledActiveStatesContentCityWrapper>
            <StyledActiveStatesContentCityWrapper>
              <h3 className={marginZero}>Ilce</h3>
            </StyledActiveStatesContentCityWrapper>
            {activeStates.map(x => (
              <div key={x.id}>
                <StyledActiveStatesContentCityWrapper>
                  <p className={marginZero}>
                    <strong>{x.cityTitle}</strong>
                  </p>
                </StyledActiveStatesContentCityWrapper>
                <StyledActiveStatesContentCityWrapper>
                  <p className={marginZero}>{x.title}</p>
                </StyledActiveStatesContentCityWrapper>
              </div>
            ))}
          </StyledActiveStatesContentWrapper>
        </StyledActiveStatesWrapper>
        <StyledShippingDaysWrapper>
          <StyledActiveStatesHeader>
            <h3>Teslimat Gunleriniz</h3>
            <p className={headerLink} onClick={handleNewShippingDaysClick}>
              Yeni Ekle
            </p>
          </StyledActiveStatesHeader>
          <StyledShippingDaysTable>
            <thead>
              <tr>
                <th>Sehir</th>
                <th>Ilce</th>
                <th>Teslimat Gunleri</th>
                <th>Islem</th>
              </tr>
            </thead>
            <tbody>
              {!shippingDaysLoading &&
                shippingDays &&
                shippingDays.map(s => (
                  <tr key={s.id}>
                    <td>
                      <b>{s.cityName}</b>
                    </td>
                    <td>
                      <p>{s.stateName}</p>
                    </td>
                    <td>
                      <p>{s.days.map(day => t(`shipping.days.${day}`)).join('-')}</p>
                    </td>
                    <td>
                      <StyledDayEditButton onClick={() => handleDayEditClick(s.stateName, s.id)}>
                        Duzenle
                      </StyledDayEditButton>
                    </td>
                  </tr>
                ))}
            </tbody>
          </StyledShippingDaysTable>
        </StyledShippingDaysWrapper>
        {totalObligation && !obligationLoading && <ObligationComponent obligation={totalObligation} />}

        <StyledInfosFormWrapper>
          <StyledInfosFormHeader>
            <h3>Bilgileri Guncelle</h3>
          </StyledInfosFormHeader>
          <StyledInfosForm>
            <StyledInfosFormElementWrapper>
              <label>Isim Soyisim : </label>
              <StyledInput id="myinfos-name" type="text" value={name} onChange={setName} />
            </StyledInfosFormElementWrapper>
            <StyledInfosFormElementWrapper>
              <label>Email : </label>
              <StyledInput id="myinfos-email" type="text" value={email} onChange={setEmail} />
            </StyledInfosFormElementWrapper>
            <StyledInfosFormElementWrapper>
              <label>Il : </label>
              <UIAutoComplete
                items={cities}
                value={cityName}
                shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.title}
                renderInput={<StyledInput id="myinfos-cities" value={cityName} onChange={e => handleCityChange(e)} />}
                renderItem={(item, highlighted) => (
                  // TODO: update this element
                  <div
                    key={item.id}
                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent', padding: 5, cursor: 'pointer' }}
                  >
                    {item.title}
                  </div>
                )}
                onSelect={item => {
                  setCityName(item.title);
                  setSelectedCityId(item.id);
                }}
              />
            </StyledInfosFormElementWrapper>
            <StyledInfosFormElementWrapper>
              <label>Ilce : </label>
              <UIAutoComplete
                items={states}
                value={stateName}
                shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.title}
                renderInput={
                  <StyledInput
                    disabled={!selectedCityId}
                    id="myinfos-states"
                    value={stateName}
                    onChange={setStateName}
                  />
                }
                renderItem={(item, highlighted) => (
                  // TODO: update this element
                  <div
                    key={item.id}
                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent', padding: 5, cursor: 'pointer' }}
                  >
                    {item.title}
                  </div>
                )}
                onSelect={item => {
                  setStateName(item.title);
                  setSelectedStateId(item.id);
                }}
              />
            </StyledInfosFormElementWrapper>
            <StyledInfosFormElementWrapper>
              <label>Adres Detayi : </label>
              <StyledInput id="myinfos-details" type="text" value={details} onChange={setDetails} />
            </StyledInfosFormElementWrapper>
            <StyledInfosFormElementWrapper>
              <StyledInfosFormButton type="submit" value="Kaydet" onClick={handleUpdateInfos}>
                Kaydet
              </StyledInfosFormButton>
            </StyledInfosFormElementWrapper>
          </StyledInfosForm>
        </StyledInfosFormWrapper>

        <StyledPasswordResetWrapper>
          <StyledInfosFormHeader>
            <h3>Sifre Degistir</h3>
          </StyledInfosFormHeader>
          <StyledInfosForm>
            <StyledInfosFormElementWrapper>
              <label>Yeni Sifre : </label>
              <StyledInput id="password-change-password" type="password" value={password} onChange={setPassword} />
            </StyledInfosFormElementWrapper>
            <StyledInfosFormElementWrapper>
              <label>Yeni Sifre(Tekrar) : </label>
              <StyledInput
                id="password-change-password-again"
                type="password"
                value={passwordConfirmation}
                onChange={setPasswordConfirmation}
              />
            </StyledInfosFormElementWrapper>
            <StyledInfosFormElementWrapper>
              <StyledInfosFormButton type="submit" value="Kaydet" onClick={handleUpdatePassword}>
                Kaydet
              </StyledInfosFormButton>
            </StyledInfosFormElementWrapper>
          </StyledInfosForm>
        </StyledPasswordResetWrapper>
      </StyledProfilePageWrapper>
    </Container>
  );
}
const PureProfilePage = React.memo(ProfilePage);

export { PureProfilePage as ProfilePage };
