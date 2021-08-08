/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '@/assets/images/logo/flogo.png';
import { FaUserCircle, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { RiNotification2Fill, RiCloseFill } from 'react-icons/ri';
import {
  AiOutlineHome,
  AiOutlineCreditCard,
  AiOutlineSetting,
  AiFillDownCircle,
  AiOutlineLogout,
} from 'react-icons/ai';
import { BiNetworkChart, BiChevronDownCircle } from 'react-icons/bi';
import { BsInboxes, BsDot } from 'react-icons/bs';
import { GoPackage } from 'react-icons/go';
import { useAuth } from '@/contexts/auth-context';
import { UILink } from '@/components/ui';
import { useWindowSize } from '@/utils/ui/use-window-size';
/* MobileHeaderMenu Helpers */

/* MobileHeaderMenu Constants */

/* MobileHeaderMenu Styles */

/* MobileHeaderMenu Component  */
function MobileHeaderMenu() {
  /* MobileHeaderMenu Variables */
  const { isAuthenticated, userDetails, logout } = useAuth();
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
                      <FaUserCircle size={16} />
                    </UILink>
                    <RiNotification2Fill size={16} />
                    <AiOutlineLogout
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
                <RiCloseFill
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
                    TÜRKÇE <BiChevronDownCircle />
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
                      <AiOutlineHome />
                      <UILink to="/merchant/home">ANASAYFA</UILink>
                    </li>
                    <li className="d-flex justify-content-start align-items-center mt-4">
                      <BiNetworkChart />
                      <UILink to="/merchant/customers">SISTEMDEKI MUSTERILER</UILink>
                    </li>
                    <li className="d-flex justify-content-start flex-column align-items-center mt-4">
                      <div className="w-100 d-flex justify-content-start">
                        <AiOutlineCreditCard />
                        <UILink to="">
                          CARI ISLEMLER <AiFillDownCircle />
                        </UILink>
                      </div>
                      <div className="menu_option w-100">
                        <ul>
                          <li className="d-flex justify-content-start align-items-center">
                            <BsDot />
                            <UILink to="/merchant/credits">Cariler</UILink>
                          </li>
                          <li className="d-flex justify-content-start align-items-center">
                            <BsDot />
                            <UILink to="/credit-activities">Cari Ekstreleri</UILink>
                          </li>
                          <li className="d-flex justify-content-start align-items-center">
                            <BsDot />
                            <UILink to="/obligation-activities">Sistem Cari Ekstreleri</UILink>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="d-flex justify-content-start flex-column align-items-center mt-4">
                      <div className="w-100 d-flex justify-content-start">
                        <GoPackage />
                        <UILink to="/merchant/customers">
                          URUN ISLEMLERI <AiFillDownCircle />
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
                      <BsInboxes />
                      <UILink to="/merchant/customers">SIPARISLERI GOR</UILink>
                    </li>
                    <li className="d-flex justify-content-start flex-column align-items-center mt-4">
                      <div className="w-100 d-flex justify-content-start">
                        <AiOutlineSetting />
                        <UILink to="/merchant/customers">
                          DESTEK ISLEMLERI <AiFillDownCircle />
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
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a href="https://facebook.com/">
                        <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <a href="https://facebook.com/">
                        <FaInstagram />
                      </a>
                    </li>
                    <li>
                      <a href="https://facebook.com/">
                        <FaLinkedinIn />
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
