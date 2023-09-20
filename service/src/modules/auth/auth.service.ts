import jwt from 'jsonwebtoken';
export class AuthService {
	static async refreshToken(headers: any): Promise<any> {
		try {
			const secret = ',TH0.n3SG0UL]^R/Q$v}aO#.V2gzbj';
			const jwtToken: string = headers['x-authorization'].replace('Bearer ', '');
			const decodedPayload = verifyToken(jwtToken, secret);
			const sanitizedPayload = removeClaims(decodedPayload);
			const jwtOptions = getJwtOptions(secret);
			return {
				accessToken: await generateToken(sanitizedPayload, jwtOptions, jwtOptions.accessTokenMaxAge),
				refreshToken: await generateToken(sanitizedPayload, jwtOptions, jwtOptions.refreshTokenMaxAge),
			};
		} catch (error) {
			throw error;
		}
	}
}

function getJwtOptions(secret: string): any {
	return {
		accessTokenMaxAge: '1h',
		refreshTokenMaxAge: '1h',
		secretKey: secret,
	};
}

function removeClaims(payload: any): any {
	delete payload['iat'];
	delete payload['exp'];
	return payload;
}

function verifyToken(token: string, secret: string): any {
	try {
		return jwt.verify(token, secret);
	} catch (error) {
		return jwt.verify(token, 'secretKey');
	}
}

async function generateToken(payload: any, jwtOptions: any, expiresIn: string): Promise<string> {
	return jwt.sign(payload, jwtOptions.secretKey, { expiresIn });
}
