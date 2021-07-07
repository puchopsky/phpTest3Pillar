import AxiosHelper from "../helpers/AxiosHelper";
import axios from "axios";

class UserAuthHandler extends AxiosHelper {
    constructor() {
        super();
        this.userLoggedIn = false;
        this.loggedUserInfo = {};
    }

    loginUser = async (userInfo) => {
        let urlApi = `${this.apiUrlGenerator}users/login`;

        return await axios
            .post(urlApi, userInfo)
            .then((response) => {
                if (response.data.success === true) {
                    this.loggedUserInfo = response.data.foundUserInfo;

                    this.localStorage.saveValueToLocalStorage(
                        "jwt",
                        response.data.token
                    );
                    this.localStorage.saveValueToLocalStorage(
                        "loggedUserInfo",
                        JSON.stringify(this.loggedUserInfo)
                    );

                    this.userLoggedIn = true;

                    return true;
                } else {
                    this.checkLoginErrorMsg(response.data.message);
                    return false;
                }
            })
            .catch((error) => {
                return false;
            });
    };

    getUserInfofromToken = async () => {
        let urlApi = `${this.apiUrlGenerator}users/userInfo`;

        return await axios
            .get(urlApi, this.headerConfiguration)
            .then((response) => {
                console.log("RESPONSE FROM USER TOKEN ", response);
                if (response.data.success === true) {
                    this.loggedUserInfo = response.data.foundUserInfo;
                    this.localStorage.saveValueToLocalStorage(
                        "loggedUserInfo",
                        JSON.stringify(this.loggedUserInfo)
                    );
                    return true;
                }
            })
            .catch((error) => {
                return false;
            });
    };

    checkLoginErrorMsg = (message) => {
        switch (message) {
            case "Password Incorrect":
                this.loginErrorMessage =
                    "El email o la contraseña son incorrectos";
                break;
            case "User not found":
                this.loginErrorMessage = "El usuario no existe";
                break;
            default:
                this.loginErrorMessage = "Hubo un error desconocido";
        }
    };
}

export default UserAuthHandler;
