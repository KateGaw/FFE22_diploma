/*eslint-disable array-callback-return*/
/*eslint-disable eqeqeq*/

export const addItem = (key, value) => {
    sessionStorage.setItem(key, value);
};

export const getItem = (key) => {
    sessionStorage.getItem(key);
};

export const deleteItem = (key) => {
    sessionStorage.removeItem(key);
};

export const clearStorage = () => {
    sessionStorage.clear();
};

export const countItems = () => {
    return sessionStorage.length;
};

export const getItemsArray = () => {
    let output = {},
        keys = Object.keys(sessionStorage),
        i = keys.length;

    while (i--) {
        output[keys[i]] = sessionStorage.getItem(keys[i]);
    }

    return output;
};

export const findKeyById = (id) => {
    let keys = Object.keys(sessionStorage);
    let output = null;
    let outputValue;
    const items = getItemsArray();
    items.map((item) => {
        if (item[0] === id) {
            outputValue = item.join(",");
        }
    });

    for (let key of keys) {
        if (outputValue === sessionStorage.getItem(key)) {
            output = key;
        }
    }

    return output;
};