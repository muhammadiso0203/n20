function login(username, loginTime, isLoggedIn) {
    console.log("".concat(username, ", ").concat(loginTime, ", ").concat(isLoggedIn));
    if (isLoggedIn === true) {
        console.log('Tizimga kirgan');
    }
    else {
        console.log('Tizimga kirmagan');
    }
}
login('Azizbek', new Date(), false);
login('Toshmat', new Date(), true);
