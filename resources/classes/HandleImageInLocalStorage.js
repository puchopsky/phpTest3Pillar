class HandleImageInLocalStorage {
    constructor(localStorageObject) {
        this.localStorage = localStorageObject;
        this.storageKey = "uploadedImages";
        this.savedImagesInLocalStorage = [];
    }

    /**
     * To save the uploaded images into the local storage. If there are images in local storage then the new
     * ones are adeed
     *
     * @param uploadedImages
     */
    saveImagesToLocalStorage(uploadedImages) {
        const partialStorageArray = this.getPartialStorageArray();

        uploadedImages.forEach((uplodedImage) => {
            const jsonToSave = JSON.stringify(Object.assign({}, uplodedImage));
            partialStorageArray.push(jsonToSave);
        });

        this.localStorage.saveValueToLocalStorage(
            this.storageKey,
            JSON.stringify(partialStorageArray)
        );
    }

    /**
     * To search the images to upload in the images that already exists in the local storage. If the image
     * exists in storage then it is removed from the images to upload
     *
     * @param imagesTotoUpload
     * @returns {*}
     */
    searchIfImageWasUploadedBefore(imagesTotoUpload) {
        this.getSavedImagesFromLocalStorage();

        const toUpLoad = imagesTotoUpload;
        toUpLoad.forEach((imageInfo, index) => {
            for (
                let indexValue = 0;
                indexValue < this.savedImagesInLocalStorage.length;
                indexValue++
            ) {
                if (
                    this.savedImagesInLocalStorage[indexValue].imageName ===
                    imageInfo.name
                ) {
                    imagesTotoUpload.splice(index, 1);
                    break;
                }
            }
        });

        return imagesTotoUpload;
    }

    /**
     * This gets from local storage an array of Json string objects for later conversion to json objects
     *
     * @returns {*[]|any}
     */
    getPartialStorageArray() {
        const localStorageValue = this.localStorage.getValueForKey(
            this.storageKey
        );

        if (Object.keys(localStorageValue).length > 0) {
            return JSON.parse(localStorageValue);
        }
        return [];
    }

    /**
     * This returns all saved images in the local storage
     */
    getSavedImagesFromLocalStorage() {
        this.savedImagesInLocalStorage = [];

        const partialStorageArray = this.getPartialStorageArray();

        if (partialStorageArray.length > 0) {
            const finalArray = [];
            partialStorageArray.forEach((jsonImageInfo) => {
                const imageInfo = JSON.parse(jsonImageInfo);
                finalArray.push(imageInfo);
            });

            this.savedImagesInLocalStorage = finalArray.reverse();
        }
    }

    /**
     * To delete a selected images from the local storage
     * @param imageNameToDelete
     */
    removeItemFromLocalStorage(imageNameToDelete) {
        this.getSavedImagesFromLocalStorage();

        for (
            let index = 0;
            index < this.savedImagesInLocalStorage.length;
            index++
        ) {
            if (
                this.savedImagesInLocalStorage[index].imageName ===
                imageNameToDelete
            ) {
                this.savedImagesInLocalStorage.splice(index, 1);
            }
        }

        const newArrayToSave = [];
        this.savedImagesInLocalStorage.forEach((imageToConvert) => {
            const jsonToSave = JSON.stringify(
                Object.assign({}, imageToConvert)
            );
            newArrayToSave.push(jsonToSave);
        });

        this.localStorage.saveValueToLocalStorage(
            this.storageKey,
            JSON.stringify(newArrayToSave)
        );
    }
}

export default HandleImageInLocalStorage;
