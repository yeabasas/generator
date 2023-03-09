import { app } from '../../config/firebase';

function LoginState() {
    app.onAuthStateChanged((user) => {
        if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log("User is signed in");
            console.log(uid)
        } else {
        // User is signed out
            console.log("User is signed out");
        }
    })
}
   export default LoginState;
