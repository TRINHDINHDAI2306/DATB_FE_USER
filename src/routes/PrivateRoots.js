import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { getToken } from "../utils/storage/index";

const PrivateRoute = ({
  component: Component,
  rolesUser,
  rolesRoute,
  ...rest
}) => {
  const hasToken = getToken();

  console.log(`rolesUser`, rolesUser);
  console.log(`rolesRoute`, rolesRoute);

  return (
    <Route
      {...rest}
      render={(props) =>
        hasToken && (!rolesRoute || rolesRoute.includes(rolesUser)) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/dang-nhap",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
};

export default PrivateRoute;
