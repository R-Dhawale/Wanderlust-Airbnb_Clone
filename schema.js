const Joi = require('joi');
const review = require('./models/review');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        price: Joi.number().min(0).required(),
        country: Joi.string().required(),
        category: Joi.string().valid('trending', 'rooms', 'cabins', 'beachfront', 'mountain', 'city').optional(),
        image: Joi.alternatives().try(
            Joi.string().uri().allow('', null),
            Joi.object({
                url: Joi.string().uri().allow('', null)
            }).optional()
        ).optional()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required()
    }).required()
});