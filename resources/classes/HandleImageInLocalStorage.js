class HandleImageInLocalStorage {
    constructor(localStorageObject) {
        this.localStorage = localStorageObject;
        this.storageKey = "uploadedImages";
        this.savedImagesInLocalStorage = [];
    }

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

    searchIfImageWasUploadedBefore(imagesTotoUpload) {
        this.getSavedImagesFromLocalStorage();

        console.log("In Search with Local values ");

        const toUpLoad = imagesTotoUpload;
        console.log("TO Filter images ", toUpLoad);
        toUpLoad.forEach((imageInfo, index) => {
            console.log("Image info ", imageInfo);
            for (
                let indexValue = 0;
                indexValue < this.savedImagesInLocalStorage.length;
                indexValue++
            ) {
                console.log(
                    "Saved Image Values ",
                    this.savedImagesInLocalStorage[indexValue]
                );
                if (
                    this.savedImagesInLocalStorage[indexValue].imageName ===
                    imageInfo.name
                ) {
                    console.log("We have a repeated iage ", index);
                    imagesTotoUpload.splice(index, 1);
                    break;
                }
            }
        });

        console.log("Final Array to return ", imagesTotoUpload);

        return imagesTotoUpload;
    }

    getPartialStorageArray() {
        const localStorageValue = this.localStorage.getValueForKey(
            this.storageKey
        );

        console.log("Value of local ", localStorageValue);
        if (Object.keys(localStorageValue).length > 0) {
            return JSON.parse(localStorageValue);
        }
        return [];
    }

    getSavedImagesFromLocalStorage() {
        this.savedImagesInLocalStorage = [];
        console.log("Initial variable value ", this.savedImagesInLocalStorage);

        const partialStorageArray = this.getPartialStorageArray();

        console.log("Value of local ", partialStorageArray);

        if (partialStorageArray.length > 0) {
            const finalArray = [];
            partialStorageArray.forEach((jsonImageInfo) => {
                console.log("To convert ", jsonImageInfo);
                const imageInfo = JSON.parse(jsonImageInfo);
                console.log("Converted Item ", imageInfo);
                finalArray.push(imageInfo);
            });

            this.savedImagesInLocalStorage = finalArray.reverse();

            console.log(
                "SavedImages in Storage ",
                this.savedImagesInLocalStorage
            );
        }
    }

    removeItemFromLocalStorage(imageNameToDelete) {
        console.log("INDX TO DELTE ", imageNameToDelete);
        this.getSavedImagesFromLocalStorage();

        for (
            let index = 0;
            index < this.savedImagesInLocalStorage.length;
            index++
        ) {
            console.log(
                "Checking item ",
                this.savedImagesInLocalStorage[index]
            );
            if (
                this.savedImagesInLocalStorage[index].imageName ===
                imageNameToDelete
            ) {
                this.savedImagesInLocalStorage.splice(index, 1);
            }
        }

        console.log("After deleting the item ", this.savedImagesInLocalStorage);

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
