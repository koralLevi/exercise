
const axios = require('axios')

module.exports = function (app) {

    let localStorage;

    app.post('/api/resource', async function (req, res) {
        try {
            console.log("POST body", req.body)
            localStorage = req.body;
            return res.status(200).send({ message: "success" });
        } catch (err) {
            return res.status(err.status || 500).send(err);
        }
    });

    app.get('/api/resource', async function (req, res) {
        try {
            let data = await getLocalStorage();
            return res.status(200).send(data);
        } catch (err) {
            return res.status(err.status || 500).send(err);
        }
    });

    app.get('/api/get/last', async function (req, res) {
        try {
            return res.status(200).send(localStorage);
        } catch (err) {
            return res.status(err.status || 500).send(err);
        }
    });

    async function getLocalStorage() {
        try {
            let res = await axios.get('localhost:8080/api/get/last'); //TODO: add headers
            console.log(`statusCode: ${res.status}`)
            return res;
        } catch (error) {
            console.error('error',error)
            throw error;
        }
    }

}
