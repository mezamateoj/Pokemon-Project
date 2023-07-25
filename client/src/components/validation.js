export default function validation(inputs) {
    let errors = {};
    if (!inputs.name) {
        errors.name = 'Name required';
    }
    if (!inputs.image) {
        errors.image = 'Image required'
    }

    // Health validation
    if (!inputs.health || isNaN(parseInt(inputs.health))) {
        errors.health = 'Health required and must be a number';
    }
    // if (!inputs.health || typeof inputs.health !== 'number') {
    //     errors.health = 'Health required and must be a number';
    // }
    if (!inputs.attack || isNaN(parseInt(inputs.attack))) {
        errors.attack = 'Attack required and must be a number';
    }
    if (!inputs.defense || isNaN(parseInt(inputs.defense))) {
        errors.defense = 'Defense required and must be a number';
    }
    if (!inputs.speed || isNaN(parseInt(inputs.speed))) {
        errors.speed = 'Speed required and must be a number';
    }
    return errors;
}