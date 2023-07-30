export default function validation(name, value) {
    let errors = {};

    if (name === 'name') {
        errors.name = !value ? 'Name required' : '';
    } else if (name === 'image') {
        errors.image = !value ? 'Image required' : '';
    } else if (name === 'health') {
        errors.health = (!value || isNaN(parseInt(value))) ? 'Health required and must be a number' : '';
    } else if (name === 'attack') {
        errors.attack = (!value || isNaN(parseInt(value))) ? 'Attack required and must be a number' : '';
    } else if (name === 'defense') {
        errors.defense = (!value || isNaN(parseInt(value))) ? 'Defense required and must be a number' : '';
    } else if (name === 'speed') {
        errors.speed = (!value || isNaN(parseInt(value))) ? 'Speed required and must be a number' : '';
    }

    return errors;
}
