/**
 * @setten/mercure
 *
 * @license MIT
 * @copyright Setten - Romain Lanz <romain.lanz@setten.io>
 */

import got from 'got';
import type { MercureConfig } from '@ioc:Setten/Mercure';

export default class Update {
	constructor(private config: MercureConfig) {}

	public send(
		topics: string | string[],
		data: Record<string, string> = {},
		isPrivate: boolean = false
	) {
		topics = Array.isArray(topics) ? topics : [topics];

		return got.post(this.config.endpoint, {
			headers: {
				Authorization: `Bearer ${this.config.adminToken}`,
			},
			form: [...topics.map((topic) => ['topic', topic]), ['data', JSON.stringify(data)]].concat(
				isPrivate ? [['private', 'on']] : []
			),
		});
	}
}
