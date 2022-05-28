import { sign } from 'jsonwebtoken';

class GenerateTokenProvider {
    async execute(userId: string) {
        const tokenKey = process.env.TOKEN_KEY;

        const token = sign({}, tokenKey, {
            subject: userId,
            expiresIn: '20s',
        });

        return token;
    }
}

export { GenerateTokenProvider };
