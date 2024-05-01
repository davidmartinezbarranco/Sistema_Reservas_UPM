const TOKEN = "token";

export function setToken(token) {
    localStorage.setItem(TOKEN, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN);
}

export function deleteToken() {
    localStorage.removeItem(TOKEN);
}

export function getRole(token) {
    const payloadEncoded = token.split('.')[1];
    const payloadDecoded = JSON.parse(atob(payloadEncoded));
    return payloadDecoded.role;
}