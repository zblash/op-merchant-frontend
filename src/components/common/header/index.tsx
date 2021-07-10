import * as React from 'react';
import styled, { colors } from '~/styled';
import { HeaderLogo } from './header-logo';
import { MenuItemProps, MenuItem } from './menu-item';
import { AccountCard } from './cards/account-card';
import { useApplicationContext } from '~/app/context';
import { UILink } from '~/components/ui';
import { logout } from '~/services/api';
import { useAuth } from '~/contexts/auth-context';
import { HeaderMenu } from '../header-menu';

/*
  Header Helpers
*/
interface HeaderProps {}

const HeaderStrings = {
  accont: 'Hesap',
  login: 'Oturum Ac',
  register: 'Kayit Ol',
  shopingBasket: 'Sepet',
  notifications: 'Bildirimler',
};

/*
  Header Styles
*/

const StyledHeaderStickyWrapper = styled.div`
  height: 56px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 0 48px 0 24px;
  display: flex;
  background-color: ${colors.black};
  color: ${colors.whiteSolid};
  align-items: center;
  z-index: 2;
`;
const HeaderBack = styled.div`
  height: 56px;
  opacity: 0;
`;
const StyledUserInfoWrapper = styled.div`
  display: flex;
  margin-left: auto;
  padding-right: 15px;
`;
const StyledMenuItemsWrapper = styled.div`
  display: flex;
  height: 100%;
`;
const StyledLink = styled(UILink)`
  display: flex;
  flex-direction: column;
  color: ${colors.whiteSolid};
`;

const _Header: React.SFC<HeaderProps> = props => {
  const applicationContext = useApplicationContext();
  const { isAuthenticated } = useAuth();
  const menuItems: MenuItemProps[] = [
    {
      id: 'notifications',
      iconName: 'alarm',
      text: HeaderStrings.notifications,
      cardContent: close => <AccountCard close={close} />,
    },
    {
      id: 'logout',
      iconName: 'rightArrow',
      text: `Cikis Yap`,
      callback: logout,
    },
  ];

  return (
    <>
      <StyledHeaderStickyWrapper>
        <HeaderLogo />
        {isAuthenticated && (
          <>
            <StyledUserInfoWrapper>
              <StyledLink to="/profile">
                <span>
                  <strong>Hosgeldin : </strong>
                  {applicationContext.user.name}
                </span>
                <span>
                  <strong>Bagli Sube : </strong>
                  {applicationContext.user.address && applicationContext.user.address.stateName}
                </span>
              </StyledLink>
            </StyledUserInfoWrapper>
            <StyledMenuItemsWrapper>
              {menuItems.map(item => (
                <MenuItem {...item} key={item.id} />
              ))}
            </StyledMenuItemsWrapper>
          </>
        )}
      </StyledHeaderStickyWrapper>
      {isAuthenticated && (
        <>
          <HeaderBack />
          <HeaderMenu />
        </>
      )}
    </>
  );
};

const Header = _Header;

export { Header };
