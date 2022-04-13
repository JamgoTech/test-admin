import { auth } from "./state"

export const authProvider = {

    login: ({ username, password }) => {
        const login = auth.login(username.value, password.value)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                localStorage.setItem('auth', JSON.stringify(auth));
            })
            .catch(() => {
                throw new Error('Network error')
            });

    },
    logout: () => {
        //localStorage.removeItem('username');
        return Promise.resolve();
    },

    checkAuth: () =>{
        return Promise.resolve();
    },

    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
           // localStorage.removeItem('username');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
 
    getPermissions: () => Promise.resolve(''),
    getRoles: () => Promise.reject('Not implemented'),
};

export default authProvider;

