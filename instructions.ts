/**
 * @setten/mercure
 *
 * @license MIT
 * @copyright Setten - Romain Lanz <romain.lanz@setten.io>
 */

import { join } from 'node:path';
import * as sinkStatic from '@adonisjs/sink';
import type { ApplicationContract } from '@ioc:Adonis/Core/Application';

function getStub(...relativePaths: string[]) {
	return join(__dirname, 'templates', ...relativePaths);
}

export default async function instructions(
	projectRoot: string,
	app: ApplicationContract,
	sink: typeof sinkStatic
) {
	// Setup config
	const configPath = app.configPath('mercure.ts');
	new sink.files.MustacheFile(projectRoot, configPath, getStub('config.txt')).commit();
	const configDir = app.directoriesMap.get('config') || 'config';
	sink.logger.action('create').succeeded(`${configDir}/mercure.ts`);

	// Setup environment
	const env = new sink.files.EnvFile(projectRoot);
	env.set('MERCURE_ENDPOINT', 'http://localhost:XXXX/.well-known/mercure');
	env.set(
		'MERCURE_ADMIN_JWT',
		'eyJhbGciOiJIUzI1NiJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.mx2ROlYlE1rp7udoDy-WCdnpLdPuKWzDxoBJXGMK4OE'
	);
	env.set('MERCURE_JWT_SECRET', 'ChangeMe');
	env.commit();
	sink.logger.action('update').succeeded('.env,.env.example');
}
