import * as React from 'react';
import { UIInput, UISelect, UICameraIcon, UIContainer } from '@/components/ui';
import { ICategoryResponse, ICustomerTypeResponse, IProductResponse, IProductRequest } from '@/utils/api/api-models';
import { Row, Col, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';

/* CreateProductComponent Helpers */
interface CreateProductComponentProps {
  barcode?: string;
  onBarcodeSubmit: (barcode: string) => void;
  onProductSubmit: (request: IProductRequest) => void;
  isBarcodeSaved: boolean;
  product?: IProductResponse;
  parentCategories: ICategoryResponse[];
  subCategories: ICategoryResponse[];
  onParentCategoryChanged: (selectedCat: string) => void;
  customerTypes: ICustomerTypeResponse[];
}

/* CreateProductComponent Constants */

/* CreateProductComponent Styles */

/* CreateProductComponent Component  */
function ProductFormComponent(props: React.PropsWithChildren<CreateProductComponentProps>) {
  /* CreateProductComponent Variables */
  const {
    register: registerProduct,
    handleSubmit: handleSubmitProduct,
    formState: { errors: errorProduct },
    control,
  } = useForm();
  const {
    register: registerBarcode,
    handleSubmit: handleSubmitBarcode,
    formState: { errors: errorBarcode },
  } = useForm();

  const [imgSrc, setImgSrc] = React.useState(props.product?.photoUrl);
  const [img, setImg] = React.useState<File>(null);

  const subCategory = React.useMemo(() => {
    return {
      value: props.product?.categoryId,
      label: props.product?.categoryName,
    };
  }, [props.product]);

  const taxOptions = React.useMemo(
    () => [
      { value: 0, label: '0%' },
      { value: 1, label: '1%' },
      { value: 8, label: '8%' },
      { value: 18, label: '18%' },
    ],
    [],
  );
  const isReadOnly = props.isBarcodeSaved;

  /* CreateProductComponent Callbacks */
  const handleBarcodeSearch = React.useCallback(
    ({ barcode: givenBarcode }: any) => {
      props.onBarcodeSubmit(givenBarcode);
    },
    [props],
  );

  const onSubmitProduct = React.useCallback(
    (s: any) => {
      const ct = s.customerTypes.map((ctx: { value: string; label: string }) => ctx.value);
      props.onProductSubmit({
        barcode: props.barcode,
        categoryId: s.subCategory.value as string,
        name: s.productName as string,
        uploadedFile: img as File,
        tax: s.tax.value as number,
        customerTypeIdList: ct,
      });
    },
    [img, props],
  );
  /* CreateProductComponent Lifecycle  */

  return (
    <UIContainer className="product__container">
      <Row>
        <Col lg={12} md={12} xl={12} sm={12} xs={12}>
          <div className="product_title">
            <h5>Ürün Bilgilerini Giriniz</h5>
          </div>
        </Col>
        <Col lg={12} md={12} xl={12} sm={12} xs={12}>
          <div className="product_content">
            <form onSubmit={handleSubmitBarcode(handleBarcodeSearch)}>
              <Row>
                <Col lg={10} md={10} xl={10} sm={12} xs={12}>
                  <UIInput
                    maxLength={13}
                    labelKey="Barkod"
                    labelClassName="font-weight-bold"
                    type="text"
                    inputClassName="border"
                    variant="solid"
                    value={props.barcode}
                    {...registerBarcode('barcode', {
                      required: true,
                      maxLength: 13,
                      minLength: 13,
                    })}
                    errorKey={
                      errorBarcode.barcode
                        ? errorBarcode.barcode.type === 'required'
                          ? 'Bu Alan zorunludur!'
                          : 'Bu alan 13 karakter olmalidir!'
                        : ''
                    }
                  />
                </Col>
                <Col className="barcode_button-wrapper" lg={2} md={2} xl={2} sm={12} xs={12}>
                  <Button type="submit">Sorgula</Button>
                </Col>
              </Row>
            </form>
            <form onSubmit={handleSubmitProduct(onSubmitProduct)}>
              <UIInput
                labelClassName="font-weight-bold"
                labelKey="Urun Ismi"
                type="text"
                inputClassName="border"
                variant="solid"
                value={props.product?.name}
                {...registerProduct('productName', {
                  required: 'Bu Alan Zorunludur.',
                })}
                errorKey={errorProduct.productName?.message}
              />
              <Controller
                control={control}
                name="tax"
                defaultValue={taxOptions[0]}
                render={({ field: { onChange, value, ref } }) => (
                  <UISelect
                    labelClassName="font-weight-bold"
                    options={taxOptions}
                    placeholderKey="Secim Yapin"
                    labelKey="Vergi Orani"
                    value={value}
                    onChange={onChange}
                    isDisabled={isReadOnly}
                    inputRef={ref}
                  />
                )}
              />
              <Controller
                control={control}
                name="mainCategory"
                defaultValue={{ value: '', label: '' }}
                render={({ field: { onChange, value, ref } }) => (
                  <UISelect
                    labelClassName="font-weight-bold"
                    options={props.parentCategories?.map(category => {
                      return { value: category.id, label: category.name };
                    })}
                    placeholderKey="Secim Yapin"
                    labelKey="Ana Kategori"
                    value={value}
                    onChange={(e: { value: string; label: string }) => {
                      props.onParentCategoryChanged(e.value);
                      onChange(e);
                    }}
                    isDisabled={isReadOnly || !props.parentCategories}
                    inputRef={ref}
                  />
                )}
              />
              <Controller
                control={control}
                name="subCategory"
                defaultValue={subCategory}
                render={({ field: { onChange, value, ref } }) => (
                  <UISelect
                    labelClassName="font-weight-bold"
                    options={props.subCategories?.map(category => {
                      return { value: category.id, label: category.name };
                    })}
                    placeholderKey="Secim Yapin"
                    labelKey="Alt Kategori"
                    value={value}
                    onChange={e => {
                      onChange(e);
                    }}
                    isDisabled={isReadOnly || !props.subCategories}
                    inputRef={ref}
                  />
                )}
              />
              <Controller
                control={control}
                name="customerTypes"
                render={({ field: { onChange, value, ref } }) => (
                  <UISelect
                    labelClassName="font-weight-bold"
                    options={props.customerTypes?.map(customerType => {
                      return { value: customerType.id, label: customerType.typeName };
                    })}
                    placeholderKey="Secim Yapin"
                    labelKey="Musteri Turleri"
                    value={value}
                    inputClassName="border"
                    isMulti
                    onChange={e => {
                      onChange(e);
                    }}
                    isDisabled={isReadOnly || !props.customerTypes}
                    inputRef={ref}
                  />
                )}
              />

              <div className="product_img">
                <label className="font-weight-bold">Urun Resmi</label>
                <UIInput
                  hidden
                  disabled={isReadOnly}
                  id="product-image"
                  name="product-image"
                  type="file"
                  onChange={event => {
                    if (event.target.files && event.target.files[0]) {
                      const file = event.target.files[0];
                      const reader = new FileReader();
                      reader.onload = e => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                        // @ts-ignore
                        setImgSrc(e.target.result as string);
                        setImg(file);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <label className="product_img_select_out_wrapper" htmlFor="product-image">
                  <div className="product_img_select_in_wrapper">
                    {imgSrc && <img src={imgSrc} alt={props.product.name} />}
                    {!imgSrc && <UICameraIcon name="photoCamera" size={16} color="#74b126" />}
                  </div>
                </label>
              </div>

              <div className="w-100 d-flex justify-content-center">
                <Button type="submit" variant="secondary">
                  Devam Ediniz
                </Button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </UIContainer>
  );
}
const PureProductFormComponent = React.memo(ProductFormComponent);

export { PureProductFormComponent as ProductFormComponent };
