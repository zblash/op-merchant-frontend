import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from '@/components/common/header/index';
import { FullScreenLoading, Footer } from '@onlineplasiyer/op-web-fronted';
import { css } from '@/styled';
import { LoginRegisterPage } from './login-register';

const Page404 = React.lazy(() => import('./404-component').then(module => ({ default: module.Page404 })));
const OrdersPage = React.lazy(() => import('./orders/index').then(module => ({ default: module.OrdersPage })));

const OrderPage = React.lazy(() => import('./order/index').then(module => ({ default: module.OrderPage })));

const ProfilePage = React.lazy(() => import('./profile/index').then(module => ({ default: module.ProfilePage })));
const CreateProductSpecifyPage = React.lazy(() =>
  import('./create-product-specify/index').then(module => ({
    default: module.CreateProductSpecifyPage,
  })),
);
const ProductSpecifiesPage = React.lazy(() =>
  import('./product-specifies/index').then(module => ({
    default: module.ProductSpecifiesPage,
  })),
);
const MerchantHome = React.lazy(() =>
  import('./merchant-home/index').then(module => ({
    default: module.MerchantHome,
  })),
);

const UpdateProductSpeciyPage = React.lazy(() =>
  import('./update-product-specify/index').then(module => ({
    default: module.UpdateProductSpeciyPage,
  })),
);

const CreateTicketPage = React.lazy(() =>
  import('./create-ticket/index').then(module => ({
    default: module.CreateTicketPage,
  })),
);

const CreditActivities = React.lazy(() =>
  import('./credit-activities/index').then(module => ({
    default: module.CreditActivities,
  })),
);
const ObligationsPage = React.lazy(() =>
  import('./obligation-activities/index').then(module => ({
    default: module.ObligationsPage,
  })),
);

const CustomersPage = React.lazy(() =>
  import('./customers/index').then(module => ({
    default: module.CustomersPage,
  })),
);

const MerchantCreditsPage = React.lazy(() =>
  import('./merchant-credits/index').then(module => ({
    default: module.MerchantCredits,
  })),
);
const CustomerProfilePage = React.lazy(() =>
  import('./customer-profile/index').then(module => ({
    default: module.CustomerProfilePage,
  })),
);
interface IRoute {
  path: string;
  basePath: string;
  component: React.ComponentClass | React.FunctionComponent;
  disabled?: boolean;
  isPrivate: boolean;
}

export const RoutesList: IRoute[] = [
  { path: '/', basePath: '/', component: MerchantHome, isPrivate: true },
  { path: '/create-ticket', basePath: '/create-ticket', component: CreateTicketPage, isPrivate: true },
  { path: '/credit-activities', basePath: '/credit-activities', component: CreditActivities, isPrivate: true },
  { path: '/orders/:userId?', basePath: '/orders', component: OrdersPage, isPrivate: true },
  { path: '/order/:orderId', basePath: '/order', component: OrderPage, isPrivate: true },
  { path: '/profile', basePath: '/profile', component: ProfilePage, isPrivate: true },

  {
    path: '/merchant/customer/:customerName/:customerId',
    basePath: '/merchant/customer',
    component: CustomerProfilePage,
    isPrivate: true,
  },
  { path: '/merchant/customers', basePath: '/merchant/customers', component: CustomersPage, isPrivate: true },
  { path: '/merchant/credits', basePath: '/merchant/credits', component: MerchantCreditsPage, isPrivate: true },
  { path: '/merchant/home', basePath: '/merchant/home', component: MerchantHome, isPrivate: true },

  {
    path: '/add-product-specify',
    basePath: '/add-product-specify',
    component: CreateProductSpecifyPage,
    isPrivate: true,
  },
  {
    path: '/edit-product-specify/:specifyId',
    basePath: '/edit-product-specify',
    component: UpdateProductSpeciyPage,
    isPrivate: true,
  },
  { path: '/product-specifies', basePath: '/product-specifies', component: ProductSpecifiesPage, isPrivate: true },
  {
    path: '/obligation-activities/:userId?',
    basePath: '/obligation-activities',
    component: ObligationsPage,
    isPrivate: true,
  },
  { path: '/login', basePath: '/login', component: LoginRegisterPage, isPrivate: false },
  { path: '/register', basePath: '/register', component: LoginRegisterPage, isPrivate: false },
];
const opacityLoading = css`
  opacity: 0.7;
`;
const Routes = React.memo(() => {
  return (
    <>
      <Header />
      <div style={{ minHeight: '100%' }}>
        <React.Suspense fallback={<FullScreenLoading className={opacityLoading} />}>
          <Switch>
            {RoutesList.map(route => (
              <Route key={route.path} path={route.path} component={route.component} exact />
            ))}
            <Route component={Page404} />
          </Switch>
        </React.Suspense>
      </div>
      <Footer />
    </>
  );
});

export default Routes;
