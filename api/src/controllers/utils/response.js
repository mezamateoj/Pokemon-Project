const { Type } = require('../../db');


const typeResponse = {
    include: [
        {
            model: Type,
            attributes: ['id', 'name'],  // Only include id and name for each type
            through: {
                attributes: [],  // Do not include any attributes from the join table
            },
        },
    ],
}

module.exports = { typeResponse };