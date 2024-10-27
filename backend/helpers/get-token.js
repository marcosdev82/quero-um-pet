const getToken = (req) => {

    const authHeader = req.headers.authorization
    const token = authHeader (" ")[1]

    return token = getToken(req)
    const decoded = jwt.verify(token, 'nossosecret')

}

module.exports = getToken