import * as React from 'react';
import Select from 'react-select';
import styled, { colors, css } from '@/styled';
import { UIButton, UIInput, UICheckbox, UIIcon } from '@/components/ui';
import {
  ISpecifyProductResponse,
  ISpecifyProductRequest,
  IAddressStateResponse,
  IProductResponse,
} from '@/services/helpers/backend-models';

/* ProductSpecifyCreateUpdateComponent Helpers */
interface ProductSpecifyCreateUpdateComponentProps {
  onSubmit: (data: ISpecifyProductRequest) => void;
  data?: ISpecifyProductResponse;
  barcode: string;
  activeStates: IAddressStateResponse[];
  product?: IProductResponse;
}

/* ProductSpecifyCreateUpdateComponent Constants */

/* ProductSpecifyCreateUpdateComponent Styles */
const StyledCreateProductSpecifyPageWrapper = styled.div`
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  margin: 15px auto 0 auto;
  background-color: ${colors.white};
  padding: 15px 1%;
  max-width: 70%;
`;
const StyledCreateProductSpecifyHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${colors.lightGray};
  margin-bottom: 15px;
`;
const StyledCreateProductSpecifyContent = styled.div`
  width: 100%;
`;
const StyledCreateProductSpecifyContentElement = styled.div``;
const StyledInput = styled(UIInput)`
  width: 99%;
  padding-left: 1%;
  height: 35px;
  margin-bottom: 10px;
  border: 2px solid ${colors.lightGray};
`;
const StyledButton = styled(UIButton)`
  transition: background-color 0.3s;
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 7px 35px;
  border-radius: 8px;
  :active {
    background-color: ${colors.primaryDark} !important;
  }
  :hover {
    background-color: ${colors.primaryDark};
  }
  :disabled {
    background-color: ${colors.lightGray};
    color: ${colors.primary};
  }
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
  width: 96px;
  height: 96px;
  margin-bottom: 24px;
  border-radius: 50%;
  border: 2px solid ${colors.primary};
  cursor: pointer;
`;

const imageIconStyle = css`
  padding: 8px;
`;
const selectInput = css`
  margin-bottom: 10px;
`;
const textCenter = css`
  text-align: center;
`;
/* ProductSpecifyCreateUpdateComponent Component  */
function ProductSpecifyFormComponent(props: React.PropsWithChildren<ProductSpecifyCreateUpdateComponentProps>) {
  const initialValues = {
    barcode: props.data ? props.data.productBarcodeList[0] : '',
    contents: props.data ? props.data.contents : 1,
    quantity: props.data ? props.data.quantity : 0,
    recommendedRetailPrice: props.data ? props.data.recommendedRetailPrice : 0,
    totalPrice: props.data ? props.data.totalPrice : 0,
    unitPrice: props.data ? props.data.unitPrice : 0,
    unitType: props.data ? props.data.unitType : null,
    stateIds: props.data ? props.data.states : [],
    discount: props.data ? props.data.discount : false,
    discountUnit: props.data && props.data.promotion ? props.data.promotion.discountUnit : 1,
    promotionText: props.data && props.data.promotion ? props.data.promotion.promotionText : '',
    discountValue: props.data && props.data.promotion ? props.data.promotion.discountValue : 0,
  };
  const [contents, setContents] = React.useState(initialValues.contents);
  const [quantity, setQuantity] = React.useState(initialValues.quantity);
  const [recommendedRetailPrice, setRecomendedRetailPrice] = React.useState(initialValues.recommendedRetailPrice);
  const [totalPrice, setTotalPrice] = React.useState(initialValues.totalPrice);
  const [unitPrice, setUnitPrice] = React.useState(initialValues.unitPrice);
  const [unitType, setUnitType] = React.useState({ value: initialValues.unitType, label: initialValues.unitType });
  const [selectedStateIds, setSelectedStateIds] = React.useState(
    initialValues.stateIds.map(x => ({
      value: x.id,
      label: `${x.cityTitle} - ${x.title}`,
    })),
  );
  const unitTypeOptions = [
    { value: 'AD', label: 'AD' },
    { value: 'KG', label: 'KG' },
    { value: 'KL', label: 'KL' },
  ];
  const [discount, setDiscount] = React.useState(initialValues.discount);
  const [discountValue, setDiscountValue] = React.useState(initialValues.discountValue);
  const [discountUnit, setDiscountUnit] = React.useState(initialValues.discountUnit);
  const [promotionText, setPromotionText] = React.useState(initialValues.promotionText);

  /* CreateProductSpecifyPage Callbacks */
  const handleSubmit = React.useCallback(() => {
    props.onSubmit({
      barcode: props.barcode,
      contents,
      quantity,
      recommendedRetailPrice,
      stateIds: selectedStateIds.map(s => s.value),
      totalPrice,
      unitPrice,
      unitType: unitType.value,
      discount,
      discountValue,
      discountUnit,
      promotionText,
    });
  }, [
    props,
    contents,
    quantity,
    recommendedRetailPrice,
    selectedStateIds,
    totalPrice,
    unitPrice,
    unitType.value,
    discount,
    discountValue,
    discountUnit,
    promotionText,
  ]);

  /* CreateProductSpecifyPage Lifecycle  */

  React.useEffect(() => {
    if (unitType && unitPrice) {
      let price = unitPrice;
      if ((unitType.value === 'KG' || unitType.value === 'KL') && contents) {
        price = parseFloat((contents * unitPrice).toFixed(2));
      }
      setTotalPrice(price);
    }
  }, [contents, unitType, unitPrice]);

  return (
    <>
      <StyledCreateProductSpecifyPageWrapper>
        <StyledCreateProductSpecifyHeader>
          <h3>Urun Tanimlamalariniz.</h3>
        </StyledCreateProductSpecifyHeader>
        {props.product && (
          <StyledCreateProductSpecifyContent>
            <StyledCreateProductSpecifyContentElement>
              <h3 className={textCenter}>{props.product.name} URUNU ICIN</h3>
              <StyledCategoryImgWrapper>
                {props.product.photoUrl && <StyledCategoryImg src={props.product.photoUrl} />}
                {!props.product.photoUrl && <UIIcon name="photoCamera" size={42} className={imageIconStyle} />}
              </StyledCategoryImgWrapper>
              <p className={textCenter}>
                Barkod Listesi: {props.product.barcodeList && props.product.barcodeList.map(br => `${br}, `)}
              </p>
            </StyledCreateProductSpecifyContentElement>
          </StyledCreateProductSpecifyContent>
        )}
        <StyledCreateProductSpecifyContent>
          <StyledCreateProductSpecifyContentElement>
            <label>Icerik Turu</label>
            <Select
              options={unitTypeOptions}
              placeholder="Secim Yapin"
              className={selectInput}
              value={unitType}
              onChange={e => setUnitType(e)}
            />
          </StyledCreateProductSpecifyContentElement>
          <StyledCreateProductSpecifyContentElement>
            <label>Satis Icerigi</label>
            <StyledInput id="contents" type="number" value={contents} onChange={e => setContents(parseInt(e, 10))} />
          </StyledCreateProductSpecifyContentElement>

          <StyledCreateProductSpecifyContentElement>
            <label>Adet Fiyati</label>
            <StyledInput
              id="unitPrice"
              type="number"
              step="0.01"
              value={unitPrice}
              onChange={e => setUnitPrice(parseFloat(e))}
            />
          </StyledCreateProductSpecifyContentElement>
          <StyledCreateProductSpecifyContentElement>
            <label>Toplam Satis Fiyati</label>
            <StyledInput
              id="totalPrice"
              type="number"
              readOnly
              value={totalPrice}
              onChange={e => setTotalPrice(parseInt(e, 10))}
            />
          </StyledCreateProductSpecifyContentElement>
          <StyledCreateProductSpecifyContentElement>
            <label>Stok Miktari</label>
            <StyledInput id="quantity" type="number" value={quantity} onChange={e => setQuantity(parseInt(e, 10))} />
          </StyledCreateProductSpecifyContentElement>
          <StyledCreateProductSpecifyContentElement>
            <label>Tavsiye Ettiginiz Satis Fiyati</label>
            <StyledInput
              id="rcmdprc"
              type="number"
              step="0.01"
              value={recommendedRetailPrice}
              onChange={e => setRecomendedRetailPrice(parseFloat(e))}
            />
          </StyledCreateProductSpecifyContentElement>
          <StyledCreateProductSpecifyContentElement>
            <label>Satis Yapacaginiz Bolgeler</label>
            <Select
              isMulti
              className={selectInput}
              isSearchable
              isClearable
              onChange={e => setSelectedStateIds(e)}
              value={selectedStateIds}
              options={props.activeStates.map(x => ({
                value: x.id,
                label: `${x.cityTitle} - ${x.title}`,
              }))}
              placeholder="Secim Yapin"
            />
          </StyledCreateProductSpecifyContentElement>
          <StyledCreateProductSpecifyContentElement>
            <UICheckbox
              value={discount}
              label="Promosyon/Indirim Uygulanacak mi?"
              id="product-discount"
              onChange={isChecked => {
                setDiscount(isChecked);
              }}
            />
          </StyledCreateProductSpecifyContentElement>
          {discount && (
            <StyledCreateProductSpecifyContentElement>
              <label>Promosyon Basligi</label>
              <StyledInput id="promotionText" type="text" value={promotionText} onChange={e => setPromotionText(e)} />
              <label>Gecerli Olacagi Satin Alma</label>
              <StyledInput
                id="discountUnit"
                type="number"
                value={discountUnit}
                onChange={e => setDiscountUnit(parseInt(e, 10))}
              />
              <label>Promosyon/Indirim Orani (Yuzdelik Olarak)</label>
              <StyledInput
                id="discountValue"
                type="number"
                step="0.01"
                value={discountValue}
                onChange={e => {
                  if (parseFloat(e) < 100 && parseFloat(e) > 0) {
                    setDiscountValue(parseFloat(e));
                  }
                }}
              />
            </StyledCreateProductSpecifyContentElement>
          )}
          <StyledCreateProductSpecifyContentElement>
            <StyledButton
              disabled={
                selectedStateIds.length === 0 ||
                !unitPrice ||
                !unitType ||
                !totalPrice ||
                !recommendedRetailPrice ||
                !quantity ||
                !contents ||
                (discount && (!discountUnit || !discountValue || !promotionText))
              }
              onClick={handleSubmit}
            >
              Kaydet
            </StyledButton>
          </StyledCreateProductSpecifyContentElement>
        </StyledCreateProductSpecifyContent>
      </StyledCreateProductSpecifyPageWrapper>
    </>
  );
}
const PureProductSpecifyFormComponent = React.memo(ProductSpecifyFormComponent);

export { PureProductSpecifyFormComponent as ProductSpecifyFormComponent };
