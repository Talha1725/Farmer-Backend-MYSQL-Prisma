const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

module.exports = router;
