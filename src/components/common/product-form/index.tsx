import * as React from 'react';
import Select from 'react-select';
import styled, { colors, css } from '@/styled';
import { UIButton, UIIcon } from '@/components/ui';
import { ICategoryResponse, ICustomerTypeResponse, IProductResponse, IProductRequest } from '@/utils/api/api-models';
import { Container, Row, Col } from 'react-bootstrap';
import Input from '@/components/ui/ui-input';
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
const StyledHiddenFilePicker = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -999;
  pointer-events: none;
`;

const StyledCategoryImg = styled.img`
  object-fit: cover;
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const StyledCategoryImgWrapper = styled.label`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: 24px;
  border-radius: 50%;
  border: 2px solid ${colors.primary};
  cursor: pointer;
`;
const imageIconStyle = css`
  padding: 8px;
`;

const label = css`
  width: 100%;
  float: left;
`;
const selectInput = css`
  margin-bottom: 10px;
`;
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
    <Container>
      <Row className="d-flex justify-content-center mt-5">
        <Col className="border rounded p-5" lg={8} md={8} xl={8} sm={12} xs={12}>
          <h2 className="pb-5">Urun Bilgilerini Girin</h2>
          <form onSubmit={handleSubmitBarcode(handleBarcodeSearch)}>
            <Row>
              <Col lg={8} md={8} xl={8} sm={12} xs={12}>
                <Input
                  maxLength={13}
                  labelKey="Barkod"
                  type="text"
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
              <Col
                lg={4}
                md={4}
                xl={4}
                sm={12}
                xs={12}
                className="d-flex flex-column align-items-end justify-content-center"
              >
                <UIButton type="submit">Sorgula</UIButton>
              </Col>
            </Row>
          </form>
          <form onSubmit={handleSubmitProduct(onSubmitProduct)}>
            <Row>
              <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                <Input
                  labelKey="Urun Ismi"
                  type="text"
                  variant="solid"
                  value={props.product?.name}
                  {...registerProduct('productName', {
                    required: 'Bu Alan Zorunludur.',
                  })}
                  errorKey={errorProduct.productName?.message}
                />
              </Col>

              <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                <label>Vergi Orani:</label>
                <Controller
                  control={control}
                  name="tax"
                  defaultValue={taxOptions[0]}
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      options={taxOptions}
                      placeholder="Secim Yapin"
                      className={selectInput}
                      value={value}
                      onChange={onChange}
                      isDisabled={isReadOnly}
                      inputRef={ref}
                    />
                  )}
                />
              </Col>

              <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                <label>Ana Kategori:</label>
                <Controller
                  control={control}
                  name="mainCategory"
                  defaultValue={{ value: '', label: '' }}
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      options={props.parentCategories?.map(category => {
                        return { value: category.id, label: category.name };
                      })}
                      placeholder="Secim Yapin"
                      className={selectInput}
                      value={value}
                      onChange={e => {
                        props.onParentCategoryChanged(e.value);
                        onChange(e);
                      }}
                      isDisabled={isReadOnly || !props.parentCategories}
                      inputRef={ref}
                    />
                  )}
                />
              </Col>

              <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                <label>Alt Kategori</label>
                <Controller
                  control={control}
                  name="subCategory"
                  defaultValue={subCategory}
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      options={props.subCategories?.map(category => {
                        return { value: category.id, label: category.name };
                      })}
                      placeholder="Secim Yapin"
                      className={selectInput}
                      value={value}
                      onChange={e => {
                        onChange(e);
                      }}
                      isDisabled={isReadOnly || !props.subCategories}
                      inputRef={ref}
                    />
                  )}
                />
              </Col>

              <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                <label>Musteri Turleri</label>
                <Controller
                  control={control}
                  name="customerTypes"
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      options={props.customerTypes?.map(customerType => {
                        return { value: customerType.id, label: customerType.typeName };
                      })}
                      placeholder="Secim Yapin"
                      className={selectInput}
                      value={value}
                      isMulti
                      onChange={e => {
                        onChange(e);
                      }}
                      isDisabled={isReadOnly || !props.customerTypes}
                      inputRef={ref}
                    />
                  )}
                />
              </Col>

              <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                <label>Urun Resmi</label>
                <StyledHiddenFilePicker
                  hidden
                  disabled={isReadOnly}
                  id="product-image"
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
                <StyledCategoryImgWrapper htmlFor="product-image">
                  {imgSrc && <StyledCategoryImg src={imgSrc} />}
                  {!imgSrc && <UIIcon name="photoCamera" size={42} className={imageIconStyle} />}
                </StyledCategoryImgWrapper>
              </Col>

              <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                <UIButton type="submit">Devam Et</UIButton>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
const PureProductFormComponent = React.memo(ProductFormComponent);

export { PureProductFormComponent as ProductFormComponent };
