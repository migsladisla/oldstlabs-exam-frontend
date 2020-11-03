const setSession = (session, name) => {
    session.user = { 
        name, 
        authorized: true
    };
}

const destroySession = session => {
    session.destroy();
}

module.exports = {
    setSession,
    destroySession
}