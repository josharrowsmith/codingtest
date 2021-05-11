// I didnt write this.
import { useCallback, useEffect, useState } from "react";

const writeToLocalStorage = (key, data) => {
  const stringifiedData = JSON.stringify(data);
  window.localStorage.setItem(key, stringifiedData);
};

const clearLocalStorageByKey = key => {
  window.localStorage.removeItem(key);
};

const getDataFromLocalStorageByKey = key => {
  return window.localStorage.getItem(key);
};

const useLocalStorage = (key, defaultValue) => {
  const [data, setData] = useState();

  const set = () => (
    localStorageData => writeToLocalStorage(key, localStorageData),
    [key]
  );
  const remove = useCallback(() => clearLocalStorageByKey(key), [key]);

  useEffect(() => {
    const currentData = getDataFromLocalStorageByKey(key);

    if (!currentData && defaultValue) {
      set(defaultValue);
    }

    if (currentData) {
      const parsedData = JSON.parse(currentData);

      if (parsedData) {
        setData(parsedData);
      }
    }

    // eslint-disable-next-line
  }, [key]);

  const checkLocalStorage = useCallback(
    e => {
      if (e.storageArea === window.localStorage) {
        if (key === e.key && e.newValue) {
          setData(JSON.parse(e.newValue));
        }
      }
    },
    [key]
  );

  const check = () => {
    return !!getDataFromLocalStorageByKey(key);
  };

  useEffect(() => {
    window.addEventListener("storage", checkLocalStorage);

    return () => window.removeEventListener("storage", checkLocalStorage);
  }, [key, checkLocalStorage]);

  return [data, set, remove, check];
};

export default useLocalStorage;
