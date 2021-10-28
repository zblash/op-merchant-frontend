import * as React from 'react';
import { Button } from 'react-bootstrap';
import { IRegisterRequest } from '@/utils/api/api-models';
import { useForm, Controller } from 'react-hook-form';
import { useMerchantRegisterMutation } from '@/queries/mutations/auth/use-merchant-register';
import { useGetCities } from '@/queries/use-get-cities';
import { useGetStatesByCity } from '@/queries/use-get-states-by-city';
import { Loading, UISelect, UITextArea, UIInput, UIPasswordInput } from '@/components/ui';
/*
  RegisterComponent Helpers
*/
interface RegisterComponentProps {}

const RegisterComponent: React.SFC<RegisterComponentProps> = () => {
  const [selectedCityId, setSelectedCityId] = React.useState<string>();

  const { data: cities, isLoading: citiesLoading } = useGetCities();
  const { data: states, isLoading: statesLoading } = useGetStatesByCity(
    selectedCityId,
    selectedCityId !== undefined && selectedCityId !== null,
  );
  const { mutate: registerMutate, isLoading } = useMerchantRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IRegisterRequest>();

  function onSubmit(s: any) {
    registerMutate({
      cityId: s.city.value,
      stateId: s.state.value,
      details: s.details,
      name: s.name,
      username: s.username,
      email: s.email,
      password: s.password,
      taxNumber: s.taxNumber,
      phoneNumber: s.phoneNumber,
      activeStates: s.activeStates.map(state => state.value),
    });
  }

  return (
    <>
      {!citiesLoading && (
        <div>
          <form className="w-75 mx-auto mb-3" onSubmit={handleSubmit(onSubmit)}>
            <UIInput
              labelKey="Isim Soyisim"
              labelClassName="font-weight-bold"
              type="text"
              className="mb-4"
              variant="solid"
              {...register('name', {
                required: 'Bu Alan Zorunludur.',
              })}
              errorKey={errors.name?.message}
            />
            <UIInput
              labelKey="Kullanici Adi"
              labelClassName="font-weight-bold"
              type="text"
              className="mb-4"
              variant="solid"
              {...register('username', {
                required: 'Bu Alan Zorunludur.',
              })}
              errorKey={errors.username?.message}
            />
            <UIPasswordInput
              labelKey="Şifre"
              labelClassName="font-weight-bold"
              className="mb-4"
              errorKey={errors.password?.message}
              {...register('password', {
                required: 'Bu Alan Zorunludur.',
              })}
            />
            <UIInput
              labelKey="E-posta"
              labelClassName="font-weight-bold"
              type="email"
              className="mb-4"
              variant="solid"
              {...register('email', {
                required: 'Bu Alan Zorunludur.',
              })}
              errorKey={errors.email?.message}
            />
            <UIInput
              labelKey="Telefon No: (555 555 5555)"
              labelClassName="font-weight-bold"
              type="text"
              className="mb-4"
              variant="solid"
              {...register('phoneNumber', {
                required: 'Bu Alan Zorunludur.',
                minLength: 10,
                maxLength: 10,
              })}
              errorKey={errors.phoneNumber?.message}
            />
            <UIInput
              labelKey="Vergi No"
              labelClassName="font-weight-bold"
              type="text"
              className="mb-4"
              variant="solid"
              {...register('taxNumber', {
                required: 'Bu Alan Zorunludur.',
              })}
              errorKey={errors.phoneNumber?.message}
            />
            <div className="mb-4">
              <Controller
                control={control}
                name="city"
                render={({ field: { onChange, value, ref } }) => (
                  <UISelect
                    options={cities.map(x => ({
                      value: x.id,
                      label: x.title,
                    }))}
                    labelKey="Ilinizi Secin"
                    labelClassName="font-weight-bold"
                    placeholderKey="Ilinizi Secin"
                    className="w-45 mb-4 float-left"
                    value={value}
                    onChange={(e: { value: string; label: string }) => {
                      setSelectedCityId(e.value);
                      onChange(e);
                    }}
                    isSearchable
                    isClearable
                    name="city"
                    inputRef={ref}
                  />
                )}
              />
              <Controller
                control={control}
                name="state"
                render={({ field: { onChange, value, ref } }) => (
                  <UISelect
                    options={states?.map(x => ({
                      value: x.id,
                      label: x.title,
                    }))}
                    labelKey="Ilcenizi Secin"
                    labelClassName="font-weight-bold"
                    placeholderKey="Ilcenizi Secin"
                    className="w-45 float-right"
                    value={value}
                    onChange={onChange}
                    isSearchable
                    isClearable
                    inputRef={ref}
                    name="state"
                    isDisabled={!selectedCityId && !statesLoading}
                  />
                )}
              />
            </div>
            <Controller
              control={control}
              name="activeStates"
              render={({ field: { onChange, value, ref } }) => (
                <UISelect
                  options={states?.map(x => ({
                    value: x.id,
                    label: x.title,
                  }))}
                  labelKey="Satis Yapacaginiz Bolgeleri Secin"
                  labelClassName="font-weight-bold"
                  className="mb-4"
                  placeholderKey="Satis Yapacaginiz Bolgeleri Secin"
                  value={value}
                  onChange={onChange}
                  isMulti
                  isSearchable
                  isClearable
                  inputRef={ref}
                  name="activeStates"
                  isDisabled={!selectedCityId && !statesLoading}
                />
              )}
            />
            <UITextArea
              labelKey="Adres Detayi"
              labelClassName="font-weight-bold"
              className="mb-5"
              {...register('details', {
                required: 'Bu Alan Zorunludur.',
              })}
              errorKey={errors.details?.message}
            />
            <div>
              <Button type="submit" className="w-100">
                {isLoading ? <Loading color="currentColor" size={24} /> : 'Üye Ol'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export { RegisterComponent };
