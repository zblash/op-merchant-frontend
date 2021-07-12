import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Footer } from '@/components/common/footer/index';
import { Header } from '@/components/common/header/index';
import { LoginPage } from './login';
import { RegisterPage } from './register';

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
  component: React.ComponentClass | React.FunctionComponent;
  disabled?: boolean;
  isPrivate: boolean;
}

export const RoutesList: IRoute[] = [
  { path: '/', component: MerchantHome, isPrivate: true },
  { path: '/create-ticket', component: CreateTicketPage, isPrivate: true },
  { path: '/credit-activities/:creditId?', component: CreditActivities, isPrivate: true },
  { path: '/orders/:userId?', component: OrdersPage, isPrivate: true },
  { path: '/order/:orderId', component: OrderPage, isPrivate: true },
  { path: '/profile', component: ProfilePage, isPrivate: true },

  {
    path: '/merchant/customer/:customerName/:customerId',
    component: CustomerProfilePage,
    isPrivate: true,
  },
  { path: '/merchant/customers', component: CustomersPage, isPrivate: true },
  { path: '/merchant/credits/:userId?', component: MerchantCreditsPage, isPrivate: true },
  { path: '/merchant/home', component: MerchantHome, isPrivate: true },

  { path: '/add-product-specify', component: CreateProductSpecifyPage, isPrivate: true },
  {
    path: '/edit-product-specify/:specifyId',
    component: UpdateProductSpeciyPage,
    isPrivate: true,
  },
  { path: '/product-specifies', component: ProductSpecifiesPage, isPrivate: true },
  { path: '/obligation-activities/:userId?', component: ObligationsPage, isPrivate: true },
  { path: '/login', component: LoginPage, isPrivate: false },
  { path: '/register', component: RegisterPage, isPrivate: false },
];

const Routes = React.memo(() => {
  return (
    <>
      <Header />
      <div style={{ minHeight: '100%' }}>
        <React.Suspense fallback={<div>Loading</div>}>
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
