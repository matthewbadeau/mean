/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

/**
 * Group Members Schema
 */
var GroupSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    members: {
        type: Array,
        user: {
            type: Schema.ObjectId,
            ref: 'User',
            added: {
                type: Date,
                default: Date.Now
            }
        },
        id: {
            type: Number,
            unique: true
        }
    },
    name: String,
    startTime: Date.
    endTime: Date
});

/**
 * Validations
 */
GroupSchema.path('name').validate(function(name) {
    return name.length;
}, 'Please give a name to your group');

/**
 * Statics
 */
GroupSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            id: id
        }).populate('group', 'name').exec(cb);
    }
};

mongoose.model('Members', GroupSchema);