const axios = require("axios");

const setAccessToken = (res, token) => {
    res.cookie('at', token, {
        httpOnly: true
    });
}

const setRefreshToken = (res, token) => {
    res.cookie('rt', token, {
        httpOnly: true
    });
}

// Returns new access token when the user refreshes the page
// Generates new access and refresh token
// Will keep your session active as long as your refresh token is valid
// Logging out will delete the cookies and will ask you to log in
const getAccessToken = (req, res) => {
    return new Promise((resolve, reject) => {
        const refreshToken = req.cookies.rt;
    
        axios.post('http://localhost:8010/api/refresh_token', { refreshToken })
            .then(result => {
                setRefreshToken(res, result.data.refreshToken);
                setAccessToken(res, result.data.accessToken);
                resolve(`Bearer ${result.data.accessToken}`);
            })
            .catch(err => {
                reject(err);
            });
    });
}

module.exports = {
    setAccessToken,
    setRefreshToken,
    getAccessToken
};