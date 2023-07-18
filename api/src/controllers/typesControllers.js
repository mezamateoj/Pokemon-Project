const axios = require('axios');
const { Type } = require('../db');

const getAllTypes = async (req, res) => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        const data = response.data.results

        data?.map(t => {
            const type = {
                name: t.name
            }
            Type.create(type)
        })
        return res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = getAllTypes;