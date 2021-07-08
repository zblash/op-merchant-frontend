import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { HeaderMenu } from "~/components/common/header-menu/index";
import { Footer } from "~/components/common/footer/index";
import { Header } from "~/components/common/header/index";
import { useAuth } from "~/contexts/auth-context";

const Page404 = React.lazy(() =>
  import("./404-component").then((module) => ({ default: module.Page404 }))
);
const OrdersPage = React.lazy(() =>
  import("./orders/index").then((module) => ({ default: module.OrdersPage }))
);

const OrderPage = React.lazy(() =>
  import("./order/index").then((module) => ({ default: module.OrderPage }))
);

const ProfilePage = React.lazy(() =>
  import("./profile/index").then((module) => ({ default: module.ProfilePage }))
);
const CreateProductSpecifyPage = React.lazy(() =>
  import("./create-product-specify/index").then((module) => ({
    default: module.CreateProductSpecifyPage,
  }))
);
const ProductSpecifiesPage = React.lazy(() =>
  import("./product-specifies/index").then((module) => ({
    default: module.ProductSpecifiesPage,
  }))
);
const MerchantHome = React.lazy(() =>
  import("./merchant-home/index").then((module) => ({
    default: module.MerchantHome,
  }))
);

const UpdateProductSpeciyPage = React.lazy(() =>
  import("./update-product-specify/index").then((module) => ({
    default: module.UpdateProductSpeciyPage,
  }))
);

const CreateTicketPage = React.lazy(() =>
  import("./create-ticket/index").then((module) => ({
    default: module.CreateTicketPage,
  }))
);

const CreditActivities = React.lazy(() =>
  import("./credit-activities/index").then((module) => ({
    default: module.CreditActivities,
  }))
);
const ObligationsPage = React.lazy(() =>
  import("./obligation-activities/index").then((module) => ({
    default: module.ObligationsPage,
  }))
);

const CustomersPage = React.lazy(() =>
  import("./customers/index").then((module) => ({
    default: module.CustomersPage,
  }))
);

const MerchantCreditsPage = React.lazy(() =>
  import("./merchant-credits/index").then((module) => ({
    default: module.MerchantCredits,
  }))
);
const CustomerProfilePage = React.lazy(() =>
  import("./customer-profile/index").then((module) => ({
    default: module.CustomerProfilePage,
  }))
);
interface IRoute {
  path: string;
  component: React.ComponentClass | React.FunctionComponent;
  disabled?: boolean;
}

const routes: IRoute[] = [
  { path: "/", component: MerchantHome },
  { path: "/create-ticket", component: CreateTicketPage },
  { path: "/credit-activities/:creditId?", component: CreditActivities },
  { path: "/orders/:userId?", component: OrdersPage },
  { path: "/order/:orderId", component: OrderPage },
  { path: "/profile", component: ProfilePage },

  {
    path: "/merchant/customer/:customerName/:customerId",
    component: CustomerProfilePage,
  },
  { path: "/merchant/customers", component: CustomersPage },
  { path: "/merchant/credits/:userId?", component: MerchantCreditsPage },
  { path: "/merchant/home", component: MerchantHome },

  { path: "/add-product-specify", component: CreateProductSpecifyPage },
  {
    path: "/edit-product-specify/:specifyId",
    component: UpdateProductSpeciyPage,
  },
  { path: "/product-specifies", component: ProductSpecifiesPage },
  { path: "/obligation-activities/:userId?", component: ObligationsPage },
];

const Routes = React.memo(() => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Header />
      <HeaderMenu />
      <div style={{ minHeight: "100%" }}>
        <React.Suspense fallback={<div>Loading</div>}>
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                render={() =>
                  isAuthenticated ? (
                    <route.component />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
                exact
              />
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
