const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

const users = [
    {
        username: 'john',
        password: 'password123admin',
        role: 'admin'
    }, {
        username: 'anna',
        password: 'password123member',
        role: 'member'
    }
];

const login = (req, res) => {
    // Read username and password from request body
    console.log("body", req.body)
    const { username, password } = req.body;
    // Filter user from the users array by username and password
    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '24h' });
        res.cookie("accessToken", accessToken).json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
}

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1] || req.cookies.accessToken;
    if (token) {
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.status(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).send("No token provided");
    }
};

const logout = (req, res) => {
    res.clearCookie("accessToken").send("Logged out");
}

exports.authenticateJWT = authenticateJWT
exports.login = login
exports.logout = logout