import Env from '@ioc:Adonis/Core/Env';
import type { MercureConfig } from '@ioc:Setten/Mercure';

const mercureConfig: MercureConfig = {
	endpoint: Env.get('MERCURE_ENDPOINT'),
	adminToken: Env.get('MERCURE_ADMIN_JWT'),

	jwt: {
		alg: 'HS256',
		secret: Env.get('MERCURE_JWT_SECRET'),
	},
};

export default mercureConfig;
