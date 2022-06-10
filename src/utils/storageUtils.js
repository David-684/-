import store from "store";
const USER_KEY = 'user_key'
const info={
    saveUser(user) {
        store.set(USER_KEY, user);
    },
    getUSer() {
        return store.get(USER_KEY) || {};
    },
    removeUser() {
        store.remove(USER_KEY);
    }
}
export default info;
