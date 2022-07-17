<p align="center">
  <img src="https://user-images.githubusercontent.com/2793951/179392918-bcfe5b41-44b3-4c9c-b661-9a14d995901b.png" alt="@setten/mercure">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@setten/mercure"><img src="https://img.shields.io/npm/dm/@setten/mercure.svg?style=flat-square" alt="Download"></a>
  <a href="https://www.npmjs.com/package/@setten/mercure"><img src="https://img.shields.io/npm/v/@setten/mercure.svg?style=flat-square" alt="Version"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/npm/l/@setten/mercure.svg?style=flat-square" alt="License"></a>
</p>

`@setten/mercure` is a [Mercure](https://mercure.rocks) client for [AdonisJS](https://adonisjs.com/).

Mercure allows you to use [Server Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) to push data to your clients using Http.

> **Note**
>
> You must have a [Mercure Hub instance running](https://mercure.rocks/docs/hub/install).
---

## Getting Started

This package is available in the npm registry.

```bash
npm install @setten/mercure
```

Next, configure the package by running the following command.

```bash
node ace configure @setten/mercure
```

and... Voilà!

### Configuration

You have to configure the package before you can use it.
The configuration is stored in the `config/mercure.ts` file.

* `endpoint`: The endpoint of the Mercure Hub.
* `adminToken`: The JWT created to authenticate as an admin of the Mercure Hub.
* `jwt.alg`: The algorithm used to sign the JWT - should correlate to Mercure Hub configuration.
* `jwt.secret`: The secret used to sign the JWT - should correlate to Mercure Hub configuration.

Note that the `adminToken` must be generated using the same `alg` and `secret` used in the Mercure Hub with the following payload.

```json
{
  "mercure": {
    "publish": [
      "*"
    ]
  }
}
```

For example, given the secret of `ChangeMe` and the algorithm of `HS256`, the JWT would be:

```
eyJhbGciOiJIUzI1NiJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.mx2ROlYlE1rp7udoDy-WCdnpLdPuKWzDxoBJXGMK4OE
```

## Usage

The Mercure Provider gives you access to two classes.

* `Update`: This class is used to publish updates to the hub.
* `Token`: This class is used to generate a token for authentication.

You can easily send an update to the hub using the `Update.send` method.

```ts
import { Update } from '@ioc:Setten/Mercure';

Update.send('/users/1', { ... });
```

The `send` method takes three arguments.

  * `topic`: The topic to publish the update to.
  * `data`: The data to publish.
  * `isPrivate`: Whether the update is private or not.

More information on the topic and data arguments can be found in the [Mercure documentation](https://mercure.rocks/spec#publication).

### Frontend

The frontend can listen to changes using the standard [`EventSource` web interface](https://developer.mozilla.org/en-US/docs/Web/API/EventSource).

```js
const url = new URL(/*  Mercure Endpoint */)
url.searchParams.append('topic', '/users/1')

const eventSource = new EventSource(url)
eventSource.onmessage = (event) => {
  console.log(event.data)
}
```

More information on the topic can be found in the [Mercure documentation](https://mercure.rocks/docs/getting-started).

### Authentication

You may want to send private messages. To do so, you need to set the update as private using the third argument of the `Update.send` method, and authenticate the client using a JWT stored in a cookie.

You can generate the JWT using the `Token` class.

```ts
import { Token } from '@ioc:Setten/Mercure';

// Generating the token allowing the user to listen on private events
// send to `/users/1`.
const token = await Token.generate({
  subscribe: ['/users/1'],
})

// Adding the token in a cookie name `mercureAuthorization`.
response.append(
  'set-cookie',
  `mercureAuthorization=${token}; Domain=.setten.io; Path=/.well-known/mercure; HttpOnly`
)
```

The cookie must be named `mercureAuthorization` and must be not encoded by AdonisJS (you cannot use `response.cookie()` at the moment for that reason).

Note that the Mercure Hub must run on the same domain as the client since cookies cannot be shared cross-domain.

Once done, you have to change your client's connection to use cookies.

```js
const eventSource = new EventSource(url, { withCredentials: true })
```

More information on the topic can be found in the [Mercure documentation](https://mercure.rocks/spec#authorization).