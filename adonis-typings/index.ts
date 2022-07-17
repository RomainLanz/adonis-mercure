/**
 * @setten/mercure
 *
 * @license MIT
 * @copyright Setten - Romain Lanz <romain.lanz@setten.io>
 */

declare module '@ioc:Setten/Mercure' {
	import type { Algorithm } from 'jws';

	export type MercureConfig = {
		endpoint: string;
		adminToken: string;

		jwt: {
			alg: Algorithm;
			secret: string;
		};
	};

	interface TokenContract {
		generate(payload: any): Promise<string>;
	}

	interface UpdateContract {
		send(
			topics: string | string[],
			data?: Record<string, string>,
			isPrivate?: boolean
		): Promise<any>;
	}

	export const Token: TokenContract;
	export const Update: UpdateContract;
}
