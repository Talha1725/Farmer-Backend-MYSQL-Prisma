const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();

router.get('/', async (req, res) => {
	
	try {
		// Fetch fieldsBook filtered by Farmer.sawie_nr in the provided array
		const farmerIDs = await prisma.farmer.findMany({
			select: {
				sawie_nr: true,
				name: true
			}
		})
		
		
		res.status(200).json(farmerIDs);
	} catch (error) {
		res.status(500).json({error: error.message});
	}
});

module.exports = router;
