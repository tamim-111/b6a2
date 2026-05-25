// src/server.ts

import app from "./app.js";
import envConfig from "./config/env.js";

const port = envConfig.port || 3000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});