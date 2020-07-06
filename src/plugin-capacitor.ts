import address from 'address';
import { resolve } from 'path';
import { IApi } from 'umi';
import { readFileJson, writeFileJson, spawn } from './utils';
import { run as runAndroid } from './build-android';

async function changeCapacitorConfig(configPath: string, url: string, cleartext: boolean = false): Promise<void> {
  const configContent = await readFileJson(configPath);

  await writeFileJson(configPath, {
    ...configContent,
    server: {
      ...configContent.server,
      url,
      cleartext,
    },
  });
}

export default (api: IApi) => {
  const logger = {
    info(...args: any[]) {
      api.logger.info('[umi-plugin-capacitor]', ...args);
    },
    log(...args: any[]) {
      api.logger.log('[umi-plugin-capacitor]', ...args);
    },
    error(...args: any[]) {
      api.logger.error('[umi-plugin-capacitor]', ...args);
    },
  };
  api.describe({
    key: 'capacitor',
    config: {
      schema(joi) {
        return joi.object({});
      },
    },
  });

  /* change default config */
  api.modifyDefaultConfig((config) => {
    return {
      ...config,
      outputPath: 'www',
      history: { type: 'hash' },
      base: './',
      publicPath: './',
    };
  });

  let first = true;

  api.onDevCompileDone(async () => {
    const { android, ios, liveUrl } = api.args;
    if (!android && !ios) {
      return;
    }
    if (first) {
      first = false;
      const url = liveUrl || `http://${address.ip()}:${api.getPort()}`;
      logger.info(`Setting url(${url}) to server.url in capacitor.config.json`);
      await changeCapacitorConfig(resolve(<string>api.paths.cwd, 'capacitor.config.json'), url, true);
      // const { capacitor = {} } = api.config;
      if (android) {
        runAndroid();
      } else if (ios) {
        // TODO: runIos();
        await spawn(resolve(process.cwd(), 'node_modules/.bin/cap'), ['copy', 'ios']);
        await spawn(resolve(process.cwd(), 'node_modules/.bin/cap'), ['open', 'ios']);
      }
    }
  });

  api.onBuildComplete(async () => {
    const { android, ios } = api.args;
    if (!android && !ios) {
      return;
    }
    await changeCapacitorConfig(resolve(<string>api.paths.cwd, 'capacitor.config.json'), 'index.html');
    // const { capacitor = {} } = api.config;
    if (android) {
      await spawn(resolve(process.cwd(), 'node_modules/.bin/cap'), ['copy', 'android']);
      await spawn(resolve(process.cwd(), 'node_modules/.bin/cap'), ['open', 'android']);
    } else if (ios) {
      await spawn(resolve(process.cwd(), 'node_modules/.bin/cap'), ['copy', 'ios']);
      await spawn(resolve(process.cwd(), 'node_modules/.bin/cap'), ['open', 'ios']);
    }
  });
};
