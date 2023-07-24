
     export const AL = data =>typeof window !== 'undefined' && window.alert(JSON.stringify(data));
      export const parseJSON = data => data!=="undefined" && JSON.parse(data);
      export const getLocal = key => typeof window !== 'undefined' && parseJSON(window.localStorage.getItem(key));
      export const setLocal = (key, value) => typeof window !== 'undefined' && window.localStorage.setItem(key, JSON.stringify(value));
      export const rmLocal = key => typeof window !== 'undefined' && window.localStorage.removeItem(key);

