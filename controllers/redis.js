const { REDIS_HOSTNAME, REDIS_PORT } = require('../configuration/constants');
const redis = require('redis');
let client;
let connected = false;

function initRedisConnection() {
    client = redis.createClient({
        host: REDIS_HOSTNAME,
        port: REDIS_PORT
    });

    client.on("error", (error) => {
        console.error(`${new Date()} - Redis connection error`, error);
        connected = false;
    });
    
    // we are listening for reconnection purpose - if there is a connection lost it will try to reconnect while service running
    client.on("connect", () => {
        console.info(`${new Date()} - Redis Successfully Connected`);
        connected = true;
    });
}

async function save(key, value) {
    return new Promise((resolve, reject) => {
        if(connected){
            client.set(key, JSON.stringify(value), (error, res) => {
                if (error) {
                    reject(error);
                }
                resolve(true)
            });
        }
        else{
            reject(new Error(`Cache is down`))
        }
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

