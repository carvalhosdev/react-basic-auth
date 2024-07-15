export const useLocalStorage = (key:string) => {

    const setItem = (value:string|object) => {
        try{
            window.localStorage.setItem(key, JSON.stringify(value));
        }catch(err){
            console.error(err);
        }
    }

    const getItem = () => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(error)
        }
    }

    const removeItem = () => {
        try{
            window.localStorage.removeItem(key);
        }catch(error){
            console.error(error);
        }
    }
  
    return {
        setItem,
        getItem,
        removeItem
    }
}
