export const getToken = () => {
    return sessionStorage.getItem("token") || null;
}

export const setUserSession = (token, user) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("username", JSON.stringify(user));
}