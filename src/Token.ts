/**
 * @setten/mercure
 *
 * @license MIT
 * @copyright Setten - Romain Lanz <romain.lanz@setten.io>
 */

import jws from 'jws';
import type { MercureConfig } from '@ioc:Setten/Mercure';

export default class Token {
	constructor(private config: MercureConfig) {}

	public generate(payload: any) {
		return new Promise((resolve, reject) => {
			jws
				.createSign({
					payload: { mercure: payload },
					secret: this.config.jwt.secret,
					header: { alg: this.config.jwt.alg },
				})
				.on('error', reject)
				.on('done', resolve);
		});
	}
}
