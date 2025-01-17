const {
    where
} = require("sequelize")
const {
    User
} = require("../models")
const {
    compareSync,
    hashSync
} = require("bcryptjs")
const {
    signToken
} = require("../helpers/jwt")



const {
    OAuth2Client
} = require('google-auth-library');

const client = new OAuth2Client();


class userController {
    static async register(req, res, next) {
        try {

            const {
                fullName,
                email,
                password
            } = req.body

            const data = await User.create({
                fullName,
                email,
                password: hashSync(password)

            })

            res.status(201).json({
                id: data.id,
                fullName: data.fullName,
                email: data.email,
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async login(req, res, next) {
        try {
            const {
                email,
                password
            } = req.body
            if (!email) throw {
                name: "InvalidLogin"
            }
            if (!password) throw {
                name: "InvalidLogin"
            }

            const newUser = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            const newName = newUser.fullName


            if (!newUser) throw {
                name: "InvalidLogin"
            }

            const compare = compareSync(password, newUser.password)
            if (!compare) throw {
                name: "InvalidLogin"
            }

            const paylod = {
                id: newUser.id
            }
            const access_token = signToken(paylod)

            res.status(200).json({
                newName,
                access_token
            })

        } catch (error) {
            res.status(401).json({
                message: "Invalid Email/Password"
            })
        }
    }
    static async googleLogin(req, res, next) {
        try {
            const {
                google_token
            } = req.headers
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: "154285753869-3iqhohcfbfk2blac1vb934r210hihr86.apps.googleusercontent.com", // Specify the CLIENT_ID of the app that accesses the backend

            });
            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    fullName: payload.family_name,
                    email: payload.email,
                    password: `${Math.random()*100}`
                }
            })
            const access_token = signToken({
                id: user.id,
                email: user.email
            })
            res.status(200).json({
                access_token
            })
        } catch (error) {
            console.log(error);

            next(error)
        }
    }

}

module.exports = userController