import * as React from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Container, Row, Col } from 'react-bootstrap';
import { FaRegUserCircle, FaMapMarkedAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { RiNotification2Fill } from 'react-icons/ri';
import { BiChevronDownCircle } from 'react-icons/bi';
import { HeaderMenu } from '../header-menu/desktop';
import { MobileHeaderMenu } from '../header-menu/mobile';
/*
  Header Helpers
*/
interface HeaderProps {}

/*
  Header Styles
*/

const _Header: React.SFC<HeaderProps> = props => {
  const { isAuthenticated, userDetails } = useAuth();

  return (
    <>
      <Container fluid className="header__top">
        {isAuthenticated && <MobileHeaderMenu />}

        <div className="header__top__left">
          {isAuthenticated && userDetails && (
            <>
              <ul>
                <li>
                  <FaRegUserCircle color="#8CBC43" /> Sn: {userDetails.name}
                </li>
                <li>
                  <FaMapMarkedAlt color="#8CBC43" /> Şube: {userDetails.address.stateName}
                </li>
                <li>
                  <RiNotification2Fill color="#8CBC43" /> Bildirimler
                </li>
              </ul>
            </>
          )}
        </div>
        <div className="header__top__right">
          <ul>
            <li>
              <FaFacebookF />
            </li>
            <li>
              <FaTwitter />
            </li>
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaLinkedinIn />
            </li>
          </ul>
          <div className="language_box">
            TÜRKÇE <BiChevronDownCircle />
            <div className="language_option">
              <ul>
                <li>TÜRKÇE</li>
                <li>İNGİLİZCE</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
      {isAuthenticated && <HeaderMenu />}
    </>
  );
};

const Header = _Header;

export { Header };
