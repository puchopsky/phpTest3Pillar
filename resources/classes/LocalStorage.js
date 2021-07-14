class LocalStorage {
    localStorageKey = "";
    localStorageValue = {};

    /**
     * To get an specific key from the local storage
     *
     * @param keyToFind
     *
     *  @returns {{}}
     */
    getValueForKey = (keyToFind) => {
        this.localStorageKey = keyToFind;
        let foundValue = localStorage.getItem(this.localStorageKey);

        if (foundValue) {
            this.localStorageValue = foundValue;
        }

        return this.localStorageValue;
    };

    /**
     * To save a set of values to a specific key in local storage
     *
     * @param keyToSave
     *
     * @param valueToSave
     */
    saveValueToLocalStorage = (keyToSave, valueToSave) => {
        localStorage.setItem(keyToSave, valueToSave);
        this.localStorageKey = keyToSave;
        this.localStorageValue = valueToSave;
    };
}

export default LocalStorage;
