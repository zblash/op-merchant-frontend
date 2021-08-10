import * as React from 'react';
import { UICheckbox, UIInput, UISelect, UIContainer } from '@/components/ui';

import {
  ICustomerTypeResponse,
  ISpecifyProductRequest,
  ISpecifyProductResponse,
  IAddressStateResponse,
  IProductResponse,
} from '@/utils/api/api-models';
import { Row, Col, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';

/* ProductSpecifyCreateUpdateComponent Helpers */
interface ProductSpecifyCreateUpdateComponentProps {
  onSubmit: (data: ISpecifyProductRequest) => void;
  data?: ISpecifyProductResponse;
  barcode: string;
  activeStates: IAddressStateResponse[];
  product?: IProductResponse;
  customerTypes: ICustomerTypeResponse[];
}

/* ProductSpecifyCreateUpdateComponent Constants */

/* ProductSpecifyCreateUpdateComponent Styles */

/* ProductSpecifyCreateUpdateComponent Component  */
function ProductSpecifyFormComponent(props: React.PropsWithChildren<ProductSpecifyCreateUpdateComponentProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm();

  const unitTypeOptions = [
    { value: 'AD', label: 'AD' },
    { value: 'KG', label: 'KG' },
    { value: 'KL', label: 'KL' },
  ];
  const [discount, setDiscount] = React.useState(props.data ? props.data.discount : false);

  /* CreateProductSpecifyPage Callbacks */
  const onSubmit = React.useCallback(
    (s: any) => {
      props.onSubmit({
        barcode: props.barcode,
        contents: s.contents,
        quantity: s.quantity,
        recommendedRetailPrice: s.recommendedRetailPrice,
        stateIds: s.selectedStateIds.map(st => st.value),
        totalPrice: s.totalPrice,
        unitPrice: s.unitPrice,
        unitType: s.unitType.value,
        discount,
        discountValue: s.discountValue,
        discountUnit: s.discountUnit,
        promotionText: s.promotionText,
        customerTypeIdList: s.customerTypes.map((ctx: { value: string; label: string }) => ctx.value),
      });
    },
    [discount, props],
  );

  const setTotalPrice = React.useCallback(() => {
    if (getValues('unitType') && getValues('unitPrice')) {
      let price = getValues('unitPrice');
      if ((getValues('unitType').value === 'KG' || getValues('unitType').value === 'KL') && getValues('contents')) {
        price = parseFloat((getValues('contents') * getValues('unitPrice')).toFixed(2));
      }
      setValue('totalPrice', price);
    }
  }, [getValues, setValue]);
  /* CreateProductSpecifyPage Lifecycle  */

  return (
    <UIContainer className="product__container">
      <Row>
        <Col lg={12} md={12} xl={12} sm={12} xs={12}>
          <div className="product_title">
            <h5>Ürün Detay Bilgilerinizi Giriniz</h5>
          </div>
        </Col>

        <Col lg={12} md={12} xl={12} sm={12} xs={12}>
          <div className="product_content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="unitType"
                defaultValue={unitTypeOptions.find(unitType => unitType.value === props.data?.unitType)}
                render={({ field: { onChange, value, ref } }) => (
                  <UISelect
                    options={unitTypeOptions}
                    placeholderKey="Secim Yapin"
                    labelKey="Satis Birimi"
                    value={value}
                    onChange={e => {
                      onChange(e);
                      setTotalPrice();
                    }}
                    inputRef={ref}
                  />
                )}
              />
              <UIInput
                labelKey="Satis Icerigi"
                type="number"
                step="any"
                variant="solid"
                defaultValue={props.data?.contents}
                {...register('contents', {
                  required: 'Bu Alan Zorunludur.',
                  min: 0.1,
                })}
                onChange={e => {
                  setValue('contents', e.target.value);
                  setTotalPrice();
                }}
                errorKey={errors.contents?.message}
              />
              <Row>
                <Col lg={6} md={6} xl={6} sm={12} xs={12}>
                  <UIInput
                    labelKey="Adet Fiyati"
                    type="number"
                    step="any"
                    variant="solid"
                    defaultValue={props.data?.unitPrice}
                    {...register('unitPrice', {
                      required: 'Bu Alan Zorunludur.',
                      min: 0.1,
                    })}
                    onChange={e => {
                      setValue('unitPrice', e.target.value);
                      setTotalPrice();
                    }}
                    errorKey={errors.unitPrice?.message}
                  />
                </Col>

                <Col lg={6} md={6} xl={6} sm={12} xs={12}>
                  <UIInput
                    labelKey="Toplam Satis Fiyati"
                    type="number"
                    step="any"
                    variant="solid"
                    defaultValue={props.data?.totalPrice}
                    {...register('totalPrice', {
                      required: 'Bu Alan Zorunludur.',
                      min: 0.1,
                    })}
                    errorKey={errors.totalPrice?.message}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} xl={6} sm={12} xs={12}>
                  <UIInput
                    labelKey="Stok Miktari"
                    type="number"
                    step="any"
                    variant="solid"
                    defaultValue={props.data?.quantity}
                    {...register('quantity', {
                      required: 'Bu Alan Zorunludur.',
                      min: 0.1,
                    })}
                    errorKey={errors.quantity?.message}
                  />
                </Col>

                <Col lg={6} md={6} xl={6} sm={12} xs={12}>
                  <UIInput
                    labelKey="Tavsiye Ettiginiz Satis Fiyati"
                    type="number"
                    step="any"
                    variant="solid"
                    defaultValue={props.data?.recommendedRetailPrice}
                    {...register('recommendedRetailPrice', {
                      required: 'Bu Alan Zorunludur.',
                      min: 0.1,
                    })}
                    errorKey={errors.recommendedRetailPrice?.message}
                  />
                </Col>
              </Row>
              <Controller
                control={control}
                defaultValue={props.data?.states?.map(x => ({
                  value: x.id,
                  label: `${x.cityTitle} - ${x.title}`,
                }))}
                name="selectedStateIds"
                render={({ field: { onChange, value, ref } }) => (
                  <UISelect
                    options={props.activeStates.map(x => ({
                      value: x.id,
                      label: `${x.cityTitle} - ${x.title}`,
                    }))}
                    placeholderKey="Secim Yapin"
                    labelKey="Satis Yapacaginiz Bolgeler"
                    value={value}
                    onChange={onChange}
                    isMulti
                    isSearchable
                    isClearable
                    inputRef={ref}
                  />
                )}
              />
              <Controller
                control={control}
                name="customerTypes"
                defaultValue={props.data?.customerTypeList?.map(x => ({
                  value: x.id,
                  label: x.typeName,
                }))}
                render={({ field: { onChange, value, ref } }) => (
                  <UISelect
                    options={props.customerTypes.map(x => ({
                      value: x.id,
                      label: x.typeName,
                    }))}
                    placeholderKey="Secim Yapin"
                    labelKey="Listelenecek Musteri Tipi"
                    value={value}
                    onChange={onChange}
                    isMulti
                    isSearchable
                    isClearable
                    inputRef={ref}
                  />
                )}
              />
              <Row>
                <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                  <Controller
                    control={control}
                    name="product-discount"
                    render={({ field: { onChange, value, ref } }) => (
                      <UICheckbox
                        value={discount}
                        label="Promosyon/Indirim Uygulanacak mi?"
                        id="product-discount"
                        onChange={isChecked => {
                          setDiscount(isChecked);
                          onChange(isChecked);
                        }}
                      />
                    )}
                  />
                </Col>
              </Row>
              {discount && (
                <>
                  <UIInput
                    labelKey="Promosyon Basligi"
                    type="text"
                    variant="solid"
                    defaultValue={props.data?.promotion?.promotionText}
                    {...register('promotionText', {
                      required: 'Bu Alan Zorunludur.',
                    })}
                    errorKey={errors.promotionText?.message}
                  />
                  <UIInput
                    labelKey="Gecerli Olacagi Satin Alma"
                    type="number"
                    variant="solid"
                    defaultValue={props.data?.promotion?.discountUnit}
                    {...register('discountUnit', {
                      required: 'Bu Alan Zorunludur.',
                      min: 0.1,
                    })}
                    errorKey={errors.discountUnit?.message}
                  />
                  <UIInput
                    labelKey="Promosyon/Indirim Orani (Yuzdelik Olarak)"
                    type="number"
                    step="any"
                    variant="solid"
                    defaultValue={props.data?.promotion?.discountValue}
                    {...register('discountValue', {
                      required: 'Bu Alan Zorunludur.',
                      min: 0.1,
                      max: 100,
                    })}
                    errorKey={errors.discountValue?.message}
                  />
                </>
              )}
              <div className="w-100 d-flex justify-content-center">
                <Button type="submit" variant="secondary">
                  Onayla
                </Button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </UIContainer>
  );
}
const PureProductSpecifyFormComponent = React.memo(ProductSpecifyFormComponent);

export { PureProductSpecifyFormComponent as ProductSpecifyFormComponent };
