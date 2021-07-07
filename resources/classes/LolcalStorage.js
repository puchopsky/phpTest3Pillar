class LocalStorage {
    localStorageKey = "";
    localStorageValue = {};

    getValueForKey = (keyToFind) => {
        this.localStorageKey = keyToFind;
        let foundValue = localStorage.getItem(this.localStorageKey);

        if (foundValue) {
            this.localStorageValue = foundValue;
        }

        return this.localStorageValue;
    };

    saveValueToLocalStorage = (keyToSave, valueToSave) => {
        localStorage.setItem(keyToSave, valueToSave);
        this.localStorageKey = keyToSave;
        this.localStorageValue = valueToSave;
    };
}

export default LocalStorage;
