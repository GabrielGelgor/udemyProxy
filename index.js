const express = require('express');
const axios = require('axios');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/search/courses', async (req,res) => {
    try{
        const { term } = req.body;
        const config = {
            headers: {
                Authorization : keys.udemyEncoded
            }
        }

        let response = await axios.get(`https://www.udemy.com/api-2.0/courses/?page_size=10&search=${term}`, config);
        let data = response.data.results.map((course) => {
            return({
                title : course.title,
                url : course.url,
                thumbnail : course.image_480x270,
                description : course.headline
            });
        })
        
        res.status(200).send({ resp : data })
    }

    catch(error){
        res.status(500).send({ resp : error });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT); 