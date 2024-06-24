const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();

// Create a new WeedTreatment
router.post('/weed-treatment', async (req, res) => {
    const {
        weed_date,
        activity,
        title_of_product,
        quantity,
        quantity_unit,
        male_labour_hours,
        female_labour_hours,
        cost_per_acer,
        field_id
    } = req.body;

    try {
        const weedTreatment = await prisma.weedTreatment.create({
            data: {
                weed_date,
                activity,
                title_of_product,
                quantity,
                quantity_unit,
                male_labour_hours,
                female_labour_hours,
                cost_per_acer,
                field: {
                    connect: { id: field_id }
                }
            }
        });
        res.status(201).json(weedTreatment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all WeedTreatments
router.get('/weed-treatment', async (req, res) => {
    try {
        const weedTreatments = await prisma.weedTreatment.findMany();
        res.json(weedTreatments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific WeedTreatment by ID
router.get('/weed-treatment/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const weedTreatment = await prisma.weedTreatment.findUnique({
            where: { id: parseInt(id) }
        });
        if (weedTreatment) {
            res.json(weedTreatment);
        } else {
            res.status(404).json({ error: 'WeedTreatment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a specific WeedTreatment by ID
router.put('/weed-treatment/:id', async (req, res) => {
    const { id } = req.params;
    const {
        weed_date,
        activity,
        title_of_product,
        quantity,
        quantity_unit,
        male_labour_hours,
        female_labour_hours,
        cost_per_acer,
        field_id
    } = req.body;

    try {
        const weedTreatment = await prisma.weedTreatment.update({
            where: { id: parseInt(id) },
            data: {
                weed_date,
                activity,
                title_of_product,
                quantity,
                quantity_unit,
                male_labour_hours,
                female_labour_hours,
                cost_per_acer,
                field: {
                    connect: { id: field_id }
                }
            }
        });
        res.json(weedTreatment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a specific WeedTreatment by ID
router.delete('/weed-treatment/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.weedTreatment.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
