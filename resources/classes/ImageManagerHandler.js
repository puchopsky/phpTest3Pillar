import AxiosHelper from "../helpers/AxiosHelper";
import LocalStorage from "./LocalStorage";
import HandleImageInLocalStorage from "./HandleImageInLocalStorage";

import axios from "axios";

class ImageMangerHandler extends AxiosHelper {
    constructor() {
        super();
        this.uploadedImages = {};
        this.faileUploadedImages = {};
        this.errorMessage = "";
        this.wasSucessfulRequest = false;
        this.imageLocalStorage = new HandleImageInLocalStorage(
            new LocalStorage()
        );
    }

    /**
     * To request the API call to upload the selected images
     *
     * @param imagesToUpload
     *
     * @returns {Promise<boolean>}
     */
    uploadImages = async (imagesToUpload) => {
        const urlApi = `${this.apiUrlGenerator}images/upload`;

        try {
            const axiosResponse = await axios.post(
                urlApi,
                imagesToUpload,
                this.headerFileUploadConfiguration
            );

            if (axiosResponse) {
                if (axiosResponse.data.success === true) {
                    this.wasSucessfulRequest = true;
                    this.uploadedImages = axiosResponse.data.imagesUploaded;

                    this.imageLocalStorage.saveImagesToLocalStorage(
                        this.uploadedImages
                    );
                } else {
                    this.errorMessage = axiosResponse.data.error;
                    this.faileUploadedImages = axiosResponse.data.failedImages;
                }
                return true;
            }
        } catch (error) {
            console.log("Failed to request the upload", error.message);
            return false;
        }
    };
}

export default ImageMangerHandler;
