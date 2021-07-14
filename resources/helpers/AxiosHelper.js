import LocalStorage from "../classes/LocalStorage";
import { API_URL } from "../config/apiUrl";

class AxiosHelper {
    constructor() {
        this.tokenBearer = "";
        this.headerConfiguration = null;
        this.headerFileUploadConfiguration = null;
        this.apiUrlGenerator = API_URL;
        this.localStorage = new LocalStorage();
        this.getTokenBearer();
        this.setHeaderConfiguration();
        this.setUploadHeaderConfiguration();
    }

    setHeaderConfiguration = () => {
        this.headerConfiguration = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + this.tokenBearer,
            },
        };
    };

    setUploadHeaderConfiguration = () => {
        this.headerFileUploadConfiguration = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + this.tokenBearer,
                "Content-Type": "multipart/form-data",
            },
        };
    };

    getTokenBearer = () => {
        this.tokenBearer = this.localStorage.getValueForKey("jwt");
    };
}

export default AxiosHelper;
