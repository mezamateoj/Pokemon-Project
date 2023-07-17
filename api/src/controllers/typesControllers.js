const axios = require('axios');
const { Type } = require('../db');

const getAllTypes = async (req, res) => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        const data = response.data.results

        const allTypes = data.map(type => {
            const allTypes = {
                name: type.name
            }
        })

        await Type.upsert(allTypes);


    } catch (error) {

    }
}

module.exports = getAllTypes;