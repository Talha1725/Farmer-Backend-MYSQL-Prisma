const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();


router.post('/', async (req, res) => {
	try {
		const {
			cost_acre,
			female_labour_hours,
			irrigation_date,
			male_labour_hours,
			source_of_irrigation,
			unit_m3,
			field_id
		} = req.body;
		
		const addedIrrigation = await prisma.irrigation.create({
			data: {
				cost_acre,
				female_labour_hours,
				irrigation_date,
				male_labour_hours,
				source_of_irrigation,
				unit_m3,
				field_id
			}
		});
		
		res.status(201).json({message: 'Irrigation record added', addedIrrigation});
	} catch (error) {
		res.status(500).json({error: error.message});
	}
});


module.exports = router;
