
const redis = require('./redis');
const KEY = "LAST_RESOURCE";

module.exports = function (app) {

    // update cache with incoming data
    app.post('/api/resource', async function (req, res) {
        try {
            console.log("POST body", req.body);
            // using redis cahce to store the incoming value so it will be available for same network
            await redis.save(KEY,req.body)
            return res.status(200).send({ message: "success" });
        } catch (err) {
            return res.status(err.status || 500).send(err);
        }
    });

    // get the last incoming data from cache
    app.get('/api/resource', async function (req, res) {
        try {
            // using redis cache to get the last saved value
            let data = await redis.get(KEY);
            console.log("GET body", data);
            return res.status(200).send(data);
        } catch (err) {
            return res.status(err.status || 500).send(err);
        }
    });

}
