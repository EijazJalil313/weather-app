import createWebStorage from "redux-persist/lib/storage/createWebStorage";

function createNoopStorage() {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
}

export function createPersistStorage(type = "local") {
    if (typeof window === "undefined") return createNoopStorage();

    try {
        const testKey = "__persist_test__";
        const webStorage = type === "session" ? window.sessionStorage : window.localStorage;
        webStorage.setItem(testKey, testKey);
        webStorage.removeItem(testKey);

        return createWebStorage(type);
    } catch {
        return createNoopStorage();
    }
}
