function validateUserName(username){
    let allowedCharatcerList = /^[a-zA-Z0-9@.-]*$/;
    if(!username)
        return "Username is empty!";
    if(username === "dog")
        return "Invalid username as dog!";
    if(username.match(allowedCharatcerList))
        return true;
    else
        return "Username can contain only alphanumeric or `.`, `-`, `!`, `@`";
}

export default validateUserName;