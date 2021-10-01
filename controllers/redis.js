const { REDIS_HOSTNAME, REDIS_PORT } = require('../configuration/constants');
const redis = require('redis');
let client;

function initRedisConnection() {
    client = redis.createClient({
        host: REDIS_HOSTNAME,
        port: REDIS_PORT
    });

    client.on("error", (error) => {
        console.error(`${new Date()} - Redis connection error`, error)
    });
    
    // we are listening for reconnection purpose - if there is a connection lost it will try to reconnect while service running
    client.on("connect", () => {
        console.info(`${new Date()} - Redis Successfully Connected`);
    });
}

async function save(key, value) {
    return new Promise((resolve, reject) => {
        client.set(key, JSON.stringify(value), (error, res) => {
            if (error) {
                reject(error);
            }
            resolve(true)
        });
    })
}

async function get(key) {
    return new Promise((resolve, reject) => {
        client.get(key, (error, res) => {
            if (error) {
                reject(error);
            }
            resolve(JSON.parse(res))
        });
    })
}

module.exports = { initRedisConnection, save, get }

