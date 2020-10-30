import shortid from 'shortid';
import Link from '../models/Link';

export async function create(req, res) {
    try {
        const { from } = req.body;

        const existing = await Link.findOne({ from });
        if (existing) {
            return res.status(400).json({ message: 'Link already exists' });
        }

        const to = process.env.EXPRESS_URL + '/t/' + shortid.generate();

        const link = new Link({
            code, to, from, owner: req.user.userId
        });

        await link.save();

        res.status(201).json({ link });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}
export async function all(req, res) {
    try {
        const links = await Link.find({ owner: req.user.userId });
        res.json(links);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}
export async function one(req, res) {
    try {
        const link = await Link.findById(req.params.id);
        res.json(link);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}