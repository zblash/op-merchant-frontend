import * as React from 'react';
import { UILink } from '@/components/ui';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

/* MobileHeaderMenu Helpers */

/* MobileHeaderMenu Constants */

/* MobileHeaderMenu Styles */

/* MobileHeaderMenu Component  */
function MobileHeaderMenu() {
  /* MobileHeaderMenu Variables */

  const [isProductMenuOpened, setIsProductMenuOpened] = React.useState(false);
  const [isCreditMenuOpened, setIsCreditMenuOpened] = React.useState(false);
  const [isSupportMenuOpened, setIsSupportMenuOpened] = React.useState(false);
  /* MobileHeaderMenu Callbacks */

  /* MobileHeaderMenu Lifecycle  */

  return (
    <div id="mobile-menu">
      <input type="checkbox" />

      <span />
      <span />
      <span />

      <ul id="menu">
        <UILink to="/merchant/home">
          <li>Anasayfa</li>
        </UILink>
        <UILink to="/merchant/customers">
          <li>Musteriler</li>
        </UILink>
        <UILink to="/orders">
          <li>Siparisler</li>
        </UILink>
        <button
          className="mega_menu_button"
          type="button"
          onClick={() => {
            setIsCreditMenuOpened(old => !old);
          }}
        >
          <li>Cari Islemler {isCreditMenuOpened ? <FaChevronUp /> : <FaChevronDown />}</li>
          <div className={`${isCreditMenuOpened ? 'd-block' : 'd-none'} `}>
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
        </button>

        <button
          className="mega_menu_button"
          type="button"
          onClick={() => {
            setIsProductMenuOpened(old => !old);
          }}
        >
          <li>Urun Islemleri {isProductMenuOpened ? <FaChevronUp /> : <FaChevronDown />}</li>
          <div className={isProductMenuOpened ? 'd-block' : 'd-none'}>
            <ul>
              <li>
                <UILink to="/product-specifies">Tüm Ürünler</UILink>
              </li>
              <li>
                <UILink to="/add-product-specify">Yeni Urun Ekle</UILink>
              </li>
            </ul>
          </div>
        </button>

        <button
          className="mega_menu_button"
          type="button"
          onClick={() => {
            setIsSupportMenuOpened(old => !old);
          }}
        >
          <li>Destek Islemleri {isSupportMenuOpened ? <FaChevronUp /> : <FaChevronDown />}</li>
          <div className={isSupportMenuOpened ? 'd-block' : 'd-none'}>
            <ul>
              <li>
                <UILink to="/create-ticket">Destek Talebi Olustur</UILink>
              </li>
              <li>
                <UILink to="/my-tickets">Destek Taleplerim</UILink>
              </li>
            </ul>
          </div>
        </button>
      </ul>
    </div>
  );
}
const PureMobileHeaderMenu = React.memo(MobileHeaderMenu);

export { PureMobileHeaderMenu as MobileHeaderMenu };
