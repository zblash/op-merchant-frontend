import React from 'react';

export default (initialValue: any) => {
  const [imgSrc, setImgSrc] = React.useState(initialValue.photoUrl);
  const [img, setImg] = React.useState<File>(null);
  const [barcode, setBarcode] = React.useState(initialValue.barcodeList ? initialValue.barcodeList[0] : '');
  const [productName, setProductName] = React.useState(initialValue.name);
  const [parentCategory, setParentCategory] = React.useState({ value: '', label: '' });
  const [subCategory, setSubCategory] = React.useState({
    value: initialValue.categoryId,
    label: initialValue.categoryName,
  });
  const [tax, setTax] = React.useState({ value: initialValue.tax, label: `${initialValue.tax}%` });

  return {
    imgSrc,
    setImgSrc,
    img,
    setImg,
    barcode,
    setBarcode,
    productName,
    setProductName,
    parentCategory,
    setParentCategory,
    subCategory,
    setSubCategory,
    tax,
    setTax,
  };
};
