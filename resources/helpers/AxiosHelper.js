import LocalStorage from "../classes/LolcalStorage";
import { API_URL } from "../config/apiUrl";

class AxiosHelper {
    constructor() {
        this.tokenBearer = "";
        this.headerConfiguration = null;
        this.headerFileUploadConfiguration = null;
        this.is401Redirect = false;
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

    check401Error = (error) => {
        if (error.response.status === 401) {
            this.is401Redirect = true;
        }
    };
}

export default AxiosHelper;
