The package has been configured successfully. The mercure configuration stored inside `config/mercure.ts` file relies on the following environment variables and hence we recommend validating them.

**Open the `env.ts` file and paste the following code inside the `Env.rules` object.**

```ts
MERCURE_ENDPOINT: Env.schema.string(),
MERCURE_ADMIN_JWT: Env.schema.string(),
MERCURE_JWT_SECRET: Env.schema.string(),
```