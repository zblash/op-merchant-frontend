/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '@/assets/images/logo/flogo.png';
import { useAuth } from '@/contexts/auth-context';
import {
  UILink,
  UICloseIcon,
  UIHOmeIcon,
  UICreditCardIcon,
  UISettingsIcon,
  UILogoutSecondIcon,
  UIOutlineDownIcon,
  UIUserIcon,
  UIFacebookIcon,
  UITwitterIcon,
  UIInstagramIcon,
  UILinkedInIcon,
  UINotificationIcon,
  UINetworkIcon,
  UIDotIcon,
  UIInboxes,
  UIPackageIcon,
  useWindowSize,
} from '@zblash/op-web-fronted';
/* MobileHeaderMenu Helpers */

/* MobileHeaderMenu Constants */

/* MobileHeaderMenu Styles */

/* MobileHeaderMenu Component  */
function MobileHeaderMenu() {
  /* MobileHeaderMenu Variables */
  const { isAuthenticated, logout } = useAuth();
  const { width } = useWindowSize();
  const [isOpened, setIsOpened] = React.useState(false);
  /* MobileHeaderMenu Callbacks */

  /* MobileHeaderMenu Lifecycle  */

  return (
    <>
      {width < 768 && (
        <>
          <Container fluid className={`mobile__header ${isOpened ? 'd-none' : 'd-block'}`}>
            <Row className="align-items-center d-flex">
              <Col
                sm={6}
                md={6}
                xs={6}
                className="mobile__header__left d-flex justify-content-start align-items-center"
              >
                <img src={Logo} alt="OnlinePlasiyer" />
              </Col>
              <Col sm={6} md={6} xs={6} className="mobile__header__right d-flex justify-content-end align-items-center">
                {isAuthenticated && (
                  <>
                    <div
                      onClick={() => {
                        setIsOpened(true);
                      }}
                    >
                      <span />
                      <span />
                      <span />
                    </div>
                    <UILink to="/profile">
                      <UIUserIcon size={16} />
                    </UILink>
                    <UINotificationIcon size={16} />
                    <UILogoutSecondIcon
                      size={16}
                      onClick={() => {
                        logout();
                      }}
                    />
                  </>
                )}
              </Col>
            </Row>
          </Container>
          <Container fluid className={`position-absolute mobile__header__menu ${isOpened ? 'd-block' : 'd-none'}`}>
            <Row className="top">
              <Col className="d-flex justify-content-end align-items-center">
                <UICloseIcon
                  color="white"
                  size={16}
                  onClick={() => {
                    setIsOpened(false);
                  }}
                />
              </Col>
            </Row>
            <div className="remain">
              <Row className="mt-3 pb-2 mb-1 border-bottom">
                <Col className="remain__top d-flex justify-content-between align-items-center">
                  <img src={Logo} alt="OnlinePlasiyer" />
                  <div className="language_box">
                    TÜRKÇE <UIOutlineDownIcon />
                    <div className="language_option">
                      <ul>
                        <li>
                          <a href="#">TÜRKÇE</a>
                        </li>
                        <li>
                          <a href="#">İNGİLİZCE</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col className="remain__menu">
                  <ul>
                    <li className="d-flex justify-content-start align-items-center mt-4">
                      <UIHOmeIcon />
                      <UILink to="/merchant/home">ANASAYFA</UILink>
                    </li>
                    <li className="d-flex justify-content-start align-items-center mt-4">
                      <UINetworkIcon />
                      <UILink to="/merchant/customers">SISTEMDEKI MUSTERILER</UILink>
                    </li>
                    <li className="d-flex justify-content-start flex-column align-items-center mt-4">
                      <div className="w-100 d-flex justify-content-start">
                        <UICreditCardIcon />
                        <UILink to="">
                          CARI ISLEMLER <UIOutlineDownIcon />
                        </UILink>
                      </div>
                      <div className="menu_option w-100">
                        <ul>
                          <li className="d-flex justify-content-start align-items-center">
                            <UIDotIcon />
                            <UILink to="/merchant/credits">Cariler</UILink>
                          </li>
                          <li className="d-flex justify-content-start align-items-center">
                            <UIDotIcon />
                            <UILink to="/credit-activities">Cari Ekstreleri</UILink>
                          </li>
                          <li className="d-flex justify-content-start align-items-center">
                            <UIDotIcon />
                            <UILink to="/obligation-activities">Sistem Cari Ekstreleri</UILink>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="d-flex justify-content-start flex-column align-items-center mt-4">
                      <div className="w-100 d-flex justify-content-start">
                        <UIPackageIcon />
                        <UILink to="/merchant/customers">
                          URUN ISLEMLERI <UIOutlineDownIcon />
                        </UILink>
                      </div>
                      <div className="menu_option w-100">
                        <ul>
                          <li>
                            <UILink to="/product-specifies">Tüm Ürünler</UILink>
                          </li>
                          <li>
                            <UILink to="/add-product-specify">Yeni Urun Ekle</UILink>
                          </li>
                        </ul>
                      </div>
                    </li>

                    <li className="d-flex justify-content-start align-items-center mt-4">
                      <UIInboxes />
                      <UILink to="/merchant/customers">SIPARISLERI GOR</UILink>
                    </li>
                    <li className="d-flex justify-content-start flex-column align-items-center mt-4">
                      <div className="w-100 d-flex justify-content-start">
                        <UISettingsIcon />
                        <UILink to="/merchant/customers">
                          DESTEK ISLEMLERI <UIOutlineDownIcon />
                        </UILink>
                      </div>
                      <div className="menu_option w-100">
                        <ul>
                          <li>
                            <UILink to="/create-ticket">Destek Talebi Olustur</UILink>
                          </li>
                          <li>
                            <UILink to="/my-tickets">Destek Taleplerim</UILink>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="border-top pt-2 remain__footer">
                  <ul>
                    <li>
                      <a href="https://facebook.com/">
                        <UIFacebookIcon />
                      </a>
                    </li>
                    <li>
                      <a href="https://facebook.com/">
                        <UITwitterIcon />
                      </a>
                    </li>
                    <li>
                      <a href="https://facebook.com/">
                        <UIInstagramIcon />
                      </a>
                    </li>
                    <li>
                      <a href="https://facebook.com/">
                        <UILinkedInIcon />
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Container>
        </>
      )}
    </>
  );
}
const PureMobileHeaderMenu = React.memo(MobileHeaderMenu);

export { PureMobileHeaderMenu as MobileHeaderMenu };
