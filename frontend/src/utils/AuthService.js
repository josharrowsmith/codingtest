export default class AuthService {
  setAuth = auth => {
    window.localStorage.setItem("auth", JSON.stringify(auth));
  };

  getAuth = () => {
    return JSON.parse(window.localStorage.getItem("auth"));
  };

  removeAuth = () => {
    window.localStorage.removeItem("auth");
  };
}
