import jwt from 'jsonwebtoken';
function Auth(req, res, next) {
    const authToken = req.headers['authorization'];
    console.log(authToken);
    if (authToken) {
        const BearerToken = authToken.split(" ");
        const token = BearerToken[1];
        console.log("Token extraído:", token);
        jwt.verify(token, jwtSecret, (error, data) => {
            if (error) {
                res.status(401).json({ infoError: `Token está Inválido! devido ao error: ${error}` });
            } else {
                req.token = token;
                req.userLogger = { id: data.id};
                next();
            }
        });
    } else {
        res.status(401).json({ error: "Token Inválido" });
    }
}

export default Auth;
