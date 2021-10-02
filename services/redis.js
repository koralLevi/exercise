const { REDIS_HOSTNAME, REDIS_PORT } = require('../configuration/constants');
const redis = require('redis');
let client;
var connected = false;

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

async function set(key, value) {
    if (connected) {
        if(!value){
            throw new Error('Resource not valid')
        }
        try {
            await client.set(key, JSON.stringify(value));
            return true;
        } catch (error) {
            throw error;
        }
    }
    else {
        throw new Error(`Cache is down`)
    }
}

async function get(key) {
    return new Promise(async (resolve, reject) => {
        if (connected) {    
            client.get(key, (error, res) => {
                if (error) {
                    reject(error);
                }
                // in case of key not found in the cache
                if(!res){
                    reject(new Error(`Resource not found`))
                }
                resolve(JSON.parse(res))
            });
        }
        else {
            reject(new Error(`Cache is down`))
        }
    })
}

function setConnected(value) {
    connected = value;
}

function getClient() {
    return client;
}


module.exports = { initRedisConnection, set, get, setConnected, getClient }

