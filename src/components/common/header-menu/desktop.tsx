import * as React from 'react';
import { UILink } from '@/components/ui';
import { Container, Row, Col } from 'react-bootstrap';
import { AiFillDownCircle } from 'react-icons/ai';
import Logo from '@/assets/images/logo/flogo.png';
/* HeaderMenu Helpers */

/* HeaderMenu Constants */

/* HeaderMenu Styles */

/* HeaderMenu Component  */
function HeaderMenu() {
  /* HeaderMenu Variables */

  /* HeaderMenu Callbacks */

  /* HeaderMenu Lifecycle  */

  return (
    <Container fluid className="header__menu">
      <Row>
        <Col xl={3} lg={3} md={3}>
          <div className="logo">
            <img src={Logo} alt="OnlinePlasiyer" />
          </div>
        </Col>
        <Col xl={9} lg={9} md={9}>
          <div className="header__menu__box">
            <ul>
              <li>
                <UILink to="/merchant/home">ANASAYFA</UILink>
              </li>
              <li>
                <UILink to="/merchant/customers">SİSTEMDEKİ MÜŞTERİLER</UILink>
              </li>
              <li>
                <UILink to="">
                  ÜRÜN iŞLEMLERİ <AiFillDownCircle color="#9e9e9e" />
                </UILink>
                <div className="menu_option">
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
              <li>
                <UILink to="">
                  CARİ İŞLEMLER <AiFillDownCircle color="#9e9e9e" />
                </UILink>
                <div className="menu_option">
                  <ul>
                    <li>
                      <UILink to="/merchant/credits">Cariler</UILink>
                    </li>
                    <li>
                      <UILink to="/credit-activities">Cari Ekstreleri</UILink>
                    </li>
                    <li>
                      <UILink to="/obligation-activities">Sistem Cari Ekstreleri</UILink>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <UILink to="/orders">SİPARİŞLERİ GÖR</UILink>
              </li>
              <li>
                <UILink to="">
                  DESTEK İŞLEMLERİ <AiFillDownCircle color="#9e9e9e" />
                </UILink>

                <div className="menu_option">
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
          </div>
        </Col>
      </Row>
    </Container>
  );
}
const PureHeaderMenu = React.memo(HeaderMenu);

export { PureHeaderMenu as HeaderMenu };
