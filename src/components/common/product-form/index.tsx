import * as React from 'react';
import Select from 'react-select';
import styled, { colors, css } from '@/styled';
import { UIInput, UIButton, UIIcon } from '@/components/ui';
import { useQuery } from '@/services/query-context/context';
import { queryEndpoints } from '@/services/query-context/query-endpoints';

import useCreateProductState from './useProductFormState';
import { IProductRequest, IProductResponse } from '@/services/helpers/backend-models';
/* CreateProductComponent Helpers */
interface CreateProductComponentProps {
  onBarcodeSubmit: (barcode: string) => void;
  onProductSubmit: (request: IProductRequest) => void;
  isBarcodeSaved: boolean;
  product?: IProductResponse;
}

/* CreateProductComponent Constants */

/* CreateProductComponent Styles */

const StyledContent = styled.div`
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  margin: 15px auto 0 auto;
  background-color: ${colors.white};
  padding: 15px 1%;
  max-width: 70%;
`;
const StyledContentHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${colors.lightGray};
  margin-bottom: 15px;
`;
const StyledContentElement = styled.div`
  width: 100%;
`;
const StyledInput = styled(UIInput)`
  width: 99%;
  padding-left: 1%;
  height: 35px;
  margin-bottom: 10px;
  border: 2px solid ${colors.lightGray};
`;
const loadingStyle = css``;
const StyledButton = styled(UIButton)<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  border: 1px solid ${colors.primary};
  color: ${colors.primary};
  background-color: ${colors.white};
  text-align: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'cursor')};
  text-decoration: none;
  border-radius: 4px;
  :hover {
    color: ${props => (props.disabled ? colors.primary : colors.white)};
    background-color: ${props => (props.disabled ? colors.white : colors.primary)};
    ${props =>
      props.disabled
        ? ''
        : `
    .${loadingStyle}:after {
      border-color: ${colors.white} transparent;
    }
  `}
  }
  :active {
    background-color: ${colors.primaryDark};
  }
  transition: background-color 0.3s, color 0.3s;
`;
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
const barcodeInput = css`
  width: 70%;
  float: left;
`;
const label = css`
  width: 100%;
  float: left;
`;
const barcodeCheckBtn = css`
  float: right;
`;
const selectInput = css`
  margin-bottom: 10px;
`;
const overFlow = css`
  overflow: auto;
`;
/* CreateProductComponent Component  */
function ProductFormComponent(props: React.PropsWithChildren<CreateProductComponentProps>) {
  /* CreateProductComponent Variables */
  const initialValue =
    props.product || ({ active: false, name: '', tax: 0, commission: 0, categoryId: '', categoryName: '' } as any);
  const {
    barcode,
    img,
    imgSrc,
    parentCategory,
    productName,
    setBarcode,
    setImg,
    setImgSrc,
    setParentCategory,
    setProductName,
    setSubCategory,
    setTax,
    subCategory,
    tax,
  } = useCreateProductState(initialValue);
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
  const { data: parentCategories, loading: parentCatLoading } = useQuery(queryEndpoints.getCategories, {
    defaultValue: [],
    variables: { type: 'parent' },
    skip: isReadOnly,
  });
  const { data: subCategories, loading: subCatLoading } = useQuery(queryEndpoints.getSubCategoriesByParentId, {
    defaultValue: [],
    variables: { parentId: parentCategory.value },
    skip: !parentCategory.value,
  });

  /* CreateProductComponent Callbacks */
  const handleBarcodeSearch = React.useCallback(() => {
    props.onBarcodeSubmit(barcode);
  }, [props, barcode]);

  const handleSubmit = React.useCallback(() => {
    props.onProductSubmit({
      barcode,
      categoryId: subCategory.value,
      name: productName,
      uploadedFile: img,
      tax: tax.value,
    });
  }, [barcode, img, productName, props, subCategory.value, tax.value]);
  /* CreateProductComponent Lifecycle  */

  React.useEffect(() => {
    if (props.product) {
      setProductName(props.product.name);
      setTax({ value: props.product.tax, label: `${props.product.tax}%` });
      setSubCategory({ value: props.product.categoryId, label: props.product.categoryName });
      setImgSrc(props.product.photoUrl);
    }
  }, [props.product]); //eslint-disable-line

  return (
    <StyledContent>
      <StyledContentHeader>
        <h3>Urun Bilgileri.</h3>
      </StyledContentHeader>
      <StyledContentElement className={overFlow}>
        <label className={label}>Barkod Girin</label>
        <StyledInput className={barcodeInput} id="barcode" value={barcode} onChange={e => setBarcode(e)} />
        <StyledButton
          className={barcodeCheckBtn}
          disabled={!barcode || barcode.length !== 13}
          onClick={handleBarcodeSearch}
        >
          Sorgula
        </StyledButton>
      </StyledContentElement>
      <StyledContentElement>
        <label>Urun Ismi</label>
        <StyledInput id="product-name" readOnly={isReadOnly} value={productName} onChange={e => setProductName(e)} />
      </StyledContentElement>
      <StyledContentElement>
        <label>Vergi Orani:</label>
        <Select
          options={taxOptions}
          placeholder="Secim Yapin"
          className={selectInput}
          value={tax}
          onChange={e => setTax(e)}
          isDisabled={isReadOnly}
        />
      </StyledContentElement>
      <StyledContentElement>
        <label>Ana Kategori</label>
        <Select
          options={parentCategories.map(category => {
            return { value: category.id, label: category.name };
          })}
          placeholder="Secim Yapin"
          className={selectInput}
          value={parentCategory}
          onChange={e => setParentCategory(e)}
          isDisabled={isReadOnly || parentCatLoading}
        />
      </StyledContentElement>
      <StyledContentElement>
        <label>Alt Kategori</label>
        <Select
          options={subCategories.map(category => {
            return { value: category.id, label: category.name };
          })}
          placeholder="Secim Yapin"
          className={selectInput}
          value={subCategory}
          onChange={e => setSubCategory(e)}
          isDisabled={isReadOnly || subCatLoading || !parentCategory.value}
        />
      </StyledContentElement>
      <StyledContentElement>
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
      </StyledContentElement>
      <StyledContentElement>
        <StyledButton disabled={!productName || !barcode || !tax || !subCategory} onClick={handleSubmit}>
          Devam Et
        </StyledButton>
      </StyledContentElement>
    </StyledContent>
  );
}
const PureProductFormComponent = React.memo(ProductFormComponent);

export { PureProductFormComponent as ProductFormComponent };
