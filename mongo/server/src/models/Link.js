import {Schema, model, Types } from 'mongoose';

const linkSchema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true, unique: true},
    code: { type: String, required: true, unique: true },
    date: {type: Date, defaults: Date.now },
    clicks: { type: Number, defaults: 0 },
    owner: { type: Types.ObjectId, ref: 'User'}
});

export default model('Link', linkSchema);