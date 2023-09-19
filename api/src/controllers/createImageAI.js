const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,

});

const openai = new OpenAIApi(configuration);


const createImage = async (req, res) => {
    const { prompt } = req.body;
    console.log(prompt)
    try {
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: '256x256'
        });

        const imgUrl = response.data.data[0].url
        console.log(imgUrl)

        return res.status(200).json({ success: true, data: imgUrl })

    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }

        res.status(400).json({ success: false, error: "The image could not be generated" });
    }

}

module.exports = createImage;
