import { useNavigate } from "react-router-dom";

export function protectedRoute(Component) {
  return function ProtectedRoute(props) {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('userDetails'))

    if (!user) {
      navigate("/user/login");
      return (
        <div className="w-full h-full flex justify-center items-center">
          Loading...
        </div>
      );
    }
    return <Component {...props} />;
  };
}

export function publicRoute(Component) {
  return function PublicRoute(props) {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('userDetails'))

    if (user) {
      navigate("/");
      return (
        <div className="w-full h-full flex justify-center items-center">
          Loading...
        </div>
      );
    }
    return <Component {...props} />;
  };
}