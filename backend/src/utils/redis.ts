import { createClient, RedisClientType } from 'redis'
import { RedisConf } from '../config'

let map:Map<number,any> = new Map<number,any>()
export async function getRedis(bucket=0) {
  let redis:RedisClientType<any> = map.get(bucket)
  if(redis) {
    return redis
  } else {
    let client = createClient(RedisConf)
    await client.connect()
    map.set(bucket,client)
    return client
  }
}