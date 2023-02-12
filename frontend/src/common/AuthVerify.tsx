import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  logOut: () => void;
}

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

function AuthVerify({logOut}: Props){
  let location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if(!user){
      return;
    }

    const parsedUser = JSON.parse(user)

    if (parsedUser) {
      const decodedJwt = parseJwt(parsedUser.accessToken);

      if (decodedJwt.exp * 1000 < Date.now()) {
        logOut();
      }
    }
  }, [location, logOut]);

  return (
    <div></div>
  );
};

export default AuthVerify;