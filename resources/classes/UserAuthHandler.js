import AxiosHelper from "../helpers/AxiosHelper";
import axios from "axios";

class UserAuthHandler extends AxiosHelper {
    constructor() {
        super();
        this.userLoggedIn = false;
        this.loggedUserInfo = {};
    }

    /**
     * To request login api call and save returned token to local storage
     *
     * @param userInfo
     *
     * @returns {Promise<boolean>}
     */
    loginUser = async (userInfo) => {
        let urlApi = `${this.apiUrlGenerator}users/login`;
        try {
            const loginResponse = await axios.post(urlApi, userInfo);

            if (loginResponse && loginResponse.data.success === true) {
                this.loggedUserInfo = loginResponse.data.foundUserInfo;

                this.localStorage.saveValueToLocalStorage(
                    "jwt",
                    loginResponse.data.token
                );

                this.localStorage.saveValueToLocalStorage(
                    "loggedUserInfo",
                    JSON.stringify(this.loggedUserInfo)
                );

                this.userLoggedIn = true;

                return true;
            }
            return false;
        } catch (error) {
            console.log(
                "There was an error while login the user ",
                error.message
            );
            return false;
        }
    };
}

export default UserAuthHandler;
