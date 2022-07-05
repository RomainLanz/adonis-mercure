/**
 * @setten/mercure
 *
 * @license MIT
 * @copyright Setten - Romain Lanz <romain.lanz@setten.io>
 */

import Token from '../src/Token';
import Update from '../src/Update';
import type { ApplicationContract } from '@ioc:Adonis/Core/Application';

export default class MercureProvider {
	constructor(protected app: ApplicationContract) {}

	public async boot() {
		this.app.container.bind('Setten/Mercure', () => {
			const config = this.app.container.resolveBinding('Adonis/Core/Config').get('mercure');

			return {
				Update: new Update(config),
				Token: new Token(config),
			};
		});
	}
}
