import { createApp } from "./app";
import { env } from "./config/env";

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`ACED backend listening on http://localhost:${env.PORT}`);
  console.log(`XRPL network: ${env.XRPL_NETWORK}`);
});
