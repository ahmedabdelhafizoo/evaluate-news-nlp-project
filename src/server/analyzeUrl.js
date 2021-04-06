var path = require('path')

require('dotenv').config({
    path: path.join(__dirname, '../../.env')
})

const fetch = require("node-fetch");
var FormData = require('form-data');

var ValidateUrl = require("./validateUrl");

function analyzeUrl(req, res) {
    const {
        API_KEY,
        API_URL
    } = process.env;
    const URL = req.query.url;

    // check that url is exists
    if (!URL) {
        res.status(400).send({
            message: "url field is required"
        });
        return;
    }
    if (!ValidateUrl(URL)) {
        res.status(400).send({
            message: "url field is not valid"
        });
        return;
    }


    const formData = new FormData();
    formData.append("key", API_KEY);
    formData.append("url", URL);
    formData.append("lang", "en");

    const requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    fetch(API_URL, requestOptions)
        .then(response => ({
            status: response.status,
            body: response.json()
        }))
        .then(response => {
            let statusCode = response.status;
            console.log(statusCode)
            response.body.then(response => {
                let {
                    agreement,
                    score_tag,
                    model,
                    irony,
                    confidence,
                    subjectivity
                } = response;

                let result = {
                    agreement,
                    score_tag,
                    model,
                    irony,
                    confidence,
                    subjectivity
                }

                console.log(result);
                res.status(statusCode).send(result);
            })

        })
        .catch(error => {
            res.status(400).send("something went wrong please try again ):");
            console.log('error', error)
        });
}


module.exports = analyzeUrl;