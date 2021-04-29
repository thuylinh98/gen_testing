import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={(props: any) => (
      checkAuth()
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
    )}
  />
);

const checkAuth = () => {
  const accessToken = localStorage.getItem('accessToken');
  const hasAccess =  accessToken !== null && accessToken !== undefined;
  return hasAccess;
}
