import * as passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import User from 'entity/User'

passport.use(
	new LocalStrategy(
		{
			usernameField: 'username',
			passwordField: 'password',
			session: false,
		},
		async (username, password, done) => {
			try {
				const user = await User.findOne({ username })

				if (user && user.checkPassword(password)) {
					return done(null, user)
				}

				return done(null, false, {
					message: 'User not found or password incorrect',
				})
			} catch (e) {
				console.log(e)
			}
		},
	),
)

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
	secretOrKey: process.env.JWT_SECRET,
}

passport.use(
	new JwtStrategy(jwtOptions, async (payload, done) => {
		try {
			const user = await User.findOne(payload.id)

			if (user) {
				done(null, user)
			} else {
				done(null, false)
			}
		} catch (e) {
			console.log(e)
		}
	}),
)
