import * as React from 'react';
import { UILink } from '@/components/ui';
import { Container, Row, Col } from 'react-bootstrap';
import { FaChevronDown } from 'react-icons/fa';
/* HeaderMenu Helpers */

/* HeaderMenu Constants */

/* HeaderMenu Styles */

/* HeaderMenu Component  */
function HeaderMenu() {
  /* HeaderMenu Variables */

  /* HeaderMenu Callbacks */

  /* HeaderMenu Lifecycle  */

  return (
    <Container fluid className="menu_container">
      <Row>
        <Col lg={12} md={12} xl={12} sm={12} xs={12}>
          <div className="header_menu">
            <ul>
              <li>
                <UILink to="/merchant/home">ANASAYFA</UILink>
              </li>
              <li>
                <UILink to="/customers">SİSTEMDEKİ MÜŞTERİLER</UILink>
              </li>
              <li>
                <UILink to="">
                  ÜRÜN iŞLEMLERİ <FaChevronDown />
                </UILink>
                <div className="pro_box">
                  <ul>
                    <li>Tüm Ürünler</li>
                    <li>Yeni Ürün Ekle</li>
                  </ul>
                </div>
              </li>
              <li>
                <UILink to="">
                  CARİ İŞLEMLER <FaChevronDown />
                </UILink>
                <div className=" cari_box">
                  <ul>
                    <li>Cariler</li>
                    <li>Cari ekstreleri</li>
                    <li>Sistem Cari ekstreleri</li>
                  </ul>
                </div>
              </li>
              <li>
                <UILink to="/orders">SİPARİŞLERİ GÖR</UILink>
              </li>
              <li>
                <UILink to="">
                  DESTEK İŞLEMLERİ <FaChevronDown />
                </UILink>

                <div className="destek_box">
                  <ul>
                    <li>Destek Talebi oluştur</li>
                    <li>Destek Taleblerim</li>
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
