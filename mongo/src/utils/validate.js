import { validationResult } from 'express-validator';

export const validate = validators => async (request, response, next) => {
    await Promise.all(validators.map(validator => validator.run(request)));

    const errors = validationResult(request);
    if (errors.isEmpty()) {
        return next();
    }

    response.status(422).json({ errors: errors.array() });
};