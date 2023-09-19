export default function validation(name, value) {
    const string = /^[a-zA-Z]+$/;
    const number = /^[0-9]+$/;
    let errors = {};

    if (name === 'name') {
        errors.name = !value ? 'Name required' : '';
        if (value && !value.match(string)) {
            errors.name = 'Name can only contain letters';
        }
    } else if (name === 'image') {
        errors.image = !value ? 'Image required' : '';
    } else if (name === 'health') {
        errors.health = (!value || isNaN(parseInt(value)) || !value.match(number)) ? 'Health required and must contain only numbers' : '';
    } else if (name === 'attack') {
        errors.attack = (!value || isNaN(parseInt(value)) || !value.match(number)) ? 'Attack required and must contain only numbers' : '';
    } else if (name === 'defense') {
        errors.defense = (!value || isNaN(parseInt(value)) || !value.match(number)) ? 'Defense required and must contain only numbers' : '';
    } else if (name === 'speed') {
        errors.speed = (!value || isNaN(parseInt(value)) || !value.match(number)) ? 'Speed required and must contain only numbers' : '';
    }

    return errors;
}
