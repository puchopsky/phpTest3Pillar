import AxiosHelper from "../helpers/AxiosHelper";
import axios from "axios";

class ImageMangerHandler extends AxiosHelper {
    constructor() {
        super();
        this.userLoggedIn = false;
        this.loggedUserInfo = {};
    }

    getAllImages = async () => {
        let urlApi = `${this.apiUrlGenerator}api/images`;

        return await axios
            .get(urlApi, this.headerConfiguration)
            .then((response) => {
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
}

export default ImageMangerHandler;
