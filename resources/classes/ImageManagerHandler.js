import AxiosHelper from "../helpers/AxiosHelper";
import axios from "axios";

class ImageMangerHandler extends AxiosHelper {
    constructor() {
        super();
        this.uploadedImages = {};
        this.faileUploadedImages = {};
        this.errorMessage = "";
        this.wasSucessfulRequest = false;
    }

    uploadImages = async (imagesToUpload) => {
        const urlApi = `${this.apiUrlGenerator}images/upload`;

        console.log("Going to request the upload", imagesToUpload);

        try {
            const axiosResponse = await axios.post(
                urlApi,
                imagesToUpload,
                this.headerFileUploadConfiguration
            );

            if (axiosResponse) {
                console.log(
                    "We have response from server ",
                    axiosResponse.data
                );
                if (axiosResponse.data.success === true) {
                    this.wasSucessfulRequest = true;
                    this.uploadedImages = axiosResponse.data.imagesUploaded;
                } else {
                    this.errorMessage = axiosResponse.data.error;
                    this.faileUploadedImages = axiosResponse.data.failedImages;
                }
                return true;
            }
        } catch (error) {
            console.log("Failed to request the upload");
            return false;
        }
    };
}

export default ImageMangerHandler;
