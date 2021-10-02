
const redis = require('../services/redis');
const KEY = "LAST_RESOURCE";
const { STATUS } = require('../configuration/constants');

module.exports = function (app) {

    // update cache with incoming data
    app.post('/api/resource', async function (req, res) {
        try {
            // using redis cahce to store the incoming value so it will be available for same network
            await redis.setValue(KEY, req.body);
            return res.status(STATUS.OK).send({ message: "success" });
        } catch (err) {
            return res.status(err.status || STATUS.INTERNAL_ERROR).send(err);
        }
    });

    // get the last incoming data from cache
    app.get('/api/resource', async function (req, res) {
        try {
            // using redis cache to get the last saved value
            console.log("++++++++++++ BEFORE")
            let data = await redis.getValue(KEY);
            console.log("************* data",data)
            return res.status(STATUS.OK).send(data);
        } catch (err) {
            return res.status(err.status || STATUS.INTERNAL_ERROR).send(err);
        }
    });
}

