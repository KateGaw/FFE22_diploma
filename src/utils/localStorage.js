/*eslint-disable array-callback-return*/
/*eslint-disable eqeqeq*/

export const addItem = (key, value) => {
    localStorage.setItem(key, value);
};

export const getItem = (key) => {
    localStorage.getItem(key);
};

export const deleteItem = (key) => {
    localStorage.removeItem(key);
};

export const clearStorage = () => {
    localStorage.clear();
};

export const countItems = () => {
    return localStorage.length;
};

export const getItemsArray = () => {
    let output = {},
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        output[keys[i]] = localStorage.getItem(keys[i]);
    }

    return output;
};

export const findKeyById = (id) => {
    let keys = Object.keys(localStorage);
    let output = null;
    let outputValue;
    const items = getItemsArray();
    items.map((item) => {
        if (item[0] === id) {
            outputValue = item.join(",");
        }
    });

    for (let key of keys) {
        if (outputValue === localStorage.getItem(key)) {
            output = key;
        }
    }

    return output;
};