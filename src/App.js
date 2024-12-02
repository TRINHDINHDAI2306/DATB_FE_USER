import { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RoutePage from "./routes/Roots.js";
import { Skeleton } from "antd";
import { createBrowserHistory } from "history";
import { AppProvider } from "./Context/AppContext.js";
import PrivateRoute from "./routes/PrivateRoots.js";
import { getItem } from "./utils/storage/index.js";

export const history = createBrowserHistory();
export default function App() {
  const user = getItem("user") ? JSON.parse(getItem("user")) : {};
  return (
    <>
      <AppProvider>
        <Router>
          <Suspense fallback={<Skeleton />}>
            <Switch>
              {RoutePage.map((route) =>
                route.authen ? (
                  <PrivateRoute
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                    rolesUser={user?.role || []}
                    rolesRoute={route.roles}
                  />
                ) : (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                  />
                )
              )}
            </Switch>
          </Suspense>
        </Router>
      </AppProvider>
    </>
  );
}
