import { Navigate } from 'react-router-dom';

const PrivateRoute = (props) => {
  // const loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
  const loginStatus = true;
  return loginStatus ? props.children : <Navigate to="/signin" />;
};

export default PrivateRoute;
