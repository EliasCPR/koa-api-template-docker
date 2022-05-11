const {npm_package_name, npm_package_version} = process.env;
const appLabel = `${npm_package_name}:${npm_package_version}`;

const {ENV, NODE_ENV, CONFIG_PATH, CONFIG_RENEW} = process.env;
const isProd = (NODE_ENV === "production" || ENV === "production");

console.log(`Starting application ${appLabel}`);

const configPath = CONFIG_PATH || (isProd ? "/config/config.json" : "./config/config.json");
const configRenew = CONFIG_RENEW || "60_000";

console.log(`-------------------------------------------
Runtime configuration:
NODE_ENV: ${NODE_ENV}
Is production environment: ${isProd}
Configuration path: ${configPath}
Configuration rewew ${configRenew}ms
-------------------------------------------`)

import ConfigHandler from './utils/config-handler';
const config = new ConfigHandler(configPath, parseInt(configRenew));

console.log("- Global configuration module loaded");

import {loadModules} from './modules/di';

console.log("- Starting dependency injection");
const bootableModules = loadModules(config)
  .filter(m => (m.bootable))
  .sort((f, s) => (
    f.order || 99) < (s.order || 99) 
      ? -1 
      : ((f.order || 99) > (s.order || 99) 
        ? 1 
        : 0));

console.log("- Starting bootable modules");

(async () => {
  try {
    // boot tem que ser sequencial
    for( const b of bootableModules ){
      await b.instance.boot();
    }

    console.log(`[√] Application ${appLabel} succesfully started`);
  } catch(e) {
    console.error(`[X] Application ${appLabel} startup failed`, e);
    process.exit(1);
  }
})();

process.on('SIGINT', function() {
  console.log();
  console.log(`[☠️] Caught interrupt signal. Exiting ${appLabel}`);
  process.exit(0);
});
