
module.exports = function (app) {

    app.post('/api/resource', async function (req, res) {
        try {
            let data = { method: 'post data' };
            console.log("POST body", req.body)
            return res.status(200).send(data);
        } catch (err) {
            return res.status(err.status || 500).send(err);
        }
    });

    app.get('/api/resource', async function (req, res) {
        try {
            let data = { method: 'get data' };
            return res.status(200).send(data);
        } catch (err) {
            return res.status(err.status || 500).send(err);
        }
    });

}
