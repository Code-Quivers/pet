import { SetOptions, createClient } from 'redis';
import config from '../config';

const redisClient = createClient({
  url: config.redis.url
});

const redisPubClient = createClient({
  url: config.redis.url
});

const redisSubClient = createClient({
  url: config.redis.url
});

redisClient.on('error', (error) => console.log('RedisError', error));
redisClient.on('connect', (error) => console.log('Redis Connected'));

const connect = async (): Promise<void> => {
  await redisClient.connect();
  await redisPubClient.connect();
  await redisSubClient.connect();
};

const set = async (key: string, value: string, options?: SetOptions): Promise<string> => {
  return (await redisClient.set(key, value, options)) as string; // Return the result of the set operation
};

const get = async (key: string): Promise<string | null> => {
  return await redisClient.get(key);
};

const del = async (key: string): Promise<void> => {
  await redisClient.del(key);
};

const expire = async (key: string, seconds: number): Promise<void> => {
  await redisClient.expire(key, seconds);
};

const setAccessToken = async (userId: string, token: string): Promise<void> => {
  const key = `access-token:${userId}`;
  await redisClient.set(key, token, { EX: Number(config.redis.expires_in) });
};

const getAccessToken = async (userId: string): Promise<string | null> => {
  const key = `access-token:${userId}`;
  return await redisClient.get(key);
};

const delAccessToken = async (userId: string): Promise<void> => {
  const key = `access-token:${userId}`;
  await redisClient.del(key);
};

const disconnect = async (): Promise<void> => {
  await redisClient.quit();
  await redisPubClient.quit();
  await redisSubClient.quit();
};

export const RedisClient = {
  connect,
  set,
  get,
  del,
  expire,
  setAccessToken,
  getAccessToken,
  delAccessToken,
  disconnect,
  publish: redisPubClient.publish.bind(redisPubClient),
  subscribe: redisSubClient.subscribe.bind(redisSubClient)
};
