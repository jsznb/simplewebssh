import Log from '../utils/log';

export function sleep(ms: any) {
  Log.info(`sleep ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}
