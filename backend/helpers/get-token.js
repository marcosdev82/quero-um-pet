const getToken = (req) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log("Authorization header not found");
        return null;
    }

    const token = authHeader.split(' ')[1];

    return token;
};

module.exports = getToken;
