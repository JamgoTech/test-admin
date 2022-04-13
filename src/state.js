import GoTrue from 'gotrue-js';

export const auth = new GoTrue({
    APIUrl: 'https://lively-raindrop-8654e4.netlify.app/.netlify/identity',
    audience: '',
    setCookie: false,
  });
            
// export const signup = auth.signup(email, password)
// .then(response => console.log("Success!Check your inbox! ", response))
// .catch(error => console.log("It 's an error", error));

// export const comfirm = auth.confirm(token)
//   .then(function(response) {
//     console.log("Account confirmed!Welcome to the party!", JSON.stringify({ response }));
//   })
//   .catch(function(e) {
//     console.log(e);
//   });

// export const login = auth.login(email.value, password.value)
// .then(response => {
//   showMessage("Success! Response: " + JSON.stringify({ response }), form);
// })
// .catch(error => showMessage("Failed :( " + JSON.stringify(error), form));

// const user = auth.currentUser();
// user
//   .logout()
//   .then(response => console.log("User logged out"))
//   .catch(error => {
//     console.log("Failed to logout user: %o", error);
//     throw error;
//   });
       