/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Container } from 'react-bootstrap';
import {
  UILink,
  UIUserIcon,
  UIMapIcon,
  UIFacebookIcon,
  UITwitterIcon,
  UIInstagramIcon,
  UILinkedInIcon,
  UISignOutIcon,
  UINotificationHornIcon,
  UINotificationIcon,
  UIDownChevronIcon,
} from '@/components/ui';
import { useWindowSize } from '@/utils/ui/use-window-size';
import { HeaderMenu } from '../header-menu/desktop';
import { MobileHeaderMenu } from '../header-menu/mobile';
import { TabletHeaderMenu } from '../header-menu/tablet';
/*
  Header Helpers
*/
interface HeaderProps {}

/*
  Header Styles
*/

const _Header: React.SFC<HeaderProps> = props => {
  const { isAuthenticated, userDetails, logout } = useAuth();
  const { width } = useWindowSize();

  return (
    <>
      <MobileHeaderMenu />

      <Container fluid className="header__top">
        {width > 1180 && (
          <div className="header__top__left">
            {isAuthenticated && userDetails && (
              <>
                <ul>
                  <li>
                    <UIUserIcon color="#8CBC43" /> Sn: {userDetails.name}
                    <div className="user_box">
                      <ul>
                        <li>
                          <UILink to="/profile">Profili Gör</UILink>
                        </li>
                        <li onClick={() => logout()}>
                          Çıkış Yap <UISignOutIcon />
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <UIMapIcon color="#8CBC43" /> Şube: {userDetails.address.stateName}
                  </li>
                  <li>
                    <UINotificationIcon color="#8CBC43" /> Bildirimler
                    <div className="user_box notification_box scrollbar" id="style-15">
                      <ul>
                        <li>
                          <span>
                            <UINotificationHornIcon />
                          </span>
                          <span> Lorem Ipsum, masaüstü </span>
                        </li>
                        <li>
                          <span>
                            <UINotificationHornIcon />
                          </span>
                          <span> Lorem Ipsum, masaüstü </span>
                        </li>
                        <li>
                          <span>
                            <UINotificationHornIcon />
                          </span>
                          <span>Lorem Ipsum, masaüstü </span>
                        </li>
                        <li>
                          <span>
                            <UINotificationHornIcon />
                          </span>
                          <span> Lorem Ipsum, masaüstü </span>
                        </li>
                        <li>
                          <span>
                            <UINotificationHornIcon />
                          </span>
                          <span> Lorem Ipsum, masaüstü </span>
                        </li>
                        <li>
                          <span>
                            <UINotificationHornIcon />
                          </span>
                          <span>Lorem Ipsum, masaüstü </span>
                        </li>
                        <li>
                          <span>
                            <UINotificationHornIcon />
                          </span>
                          <span>Lorem Ipsum, masaüstü </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </>
            )}
          </div>
        )}
        <div className="header__top__right">
          {width > 1180 && (
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
          )}
          <div className="language_box">
            TÜRKÇE <UIDownChevronIcon />
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
        </div>
      </Container>
      {isAuthenticated && <HeaderMenu />}
      {isAuthenticated && <TabletHeaderMenu />}
    </>
  );
};

const Header = _Header;

export { Header };
