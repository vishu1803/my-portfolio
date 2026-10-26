const { spawnSync } = require("node:child_process");
const result = spawnSync(process.execPath, [require("node:path").resolve(__dirname, "node_modules/eslint/bin/eslint.js"), ".", "--ext", ".js,.jsx,.ts,.tsx", "--max-warnings", "0"], { stdio: "inherit" });
if (result.error) { console.error(result.error.message); process.exit(1); }
process.exit(result.status === null ? 1 : result.status);
