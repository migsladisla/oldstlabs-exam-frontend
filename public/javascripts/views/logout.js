var logoutBtn = $('#logout-btn');

logoutBtn.click(() => {
    axios
    .post('http://localhost:8000/logout')
    .then(result => {
        window.location.href = "http://localhost:8000/login";
    })
    .catch(err => {
        console.error(err.response);
    });
});