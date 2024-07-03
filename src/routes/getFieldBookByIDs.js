const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();

// Input validation function (assuming ids should be an array of numbers)
function validateInput(id, type) {
	if (!Array.isArray(id) || !id.every(Number.isInteger)) {
		throw new Error('Invalid input: id should be an array of integers.');
	}
	if (typeof type !== 'string' || !['sawie_nr', 'field_id'].includes(type)) {
		throw new Error('Invalid input: type should be either "sawie_nr" or "field_id".');
	}
}

router.post('/', async (req, res) => {
	const {id, type} = req.body;
	
	console.log('id', id);
	console.log('type', type);
	
	try {
		validateInput(id, type);
		
		let whereClause = {};
		
		if (type === 'sawie_nr') {
			whereClause = {
				Farmer: {
					sawie_nr: {
						in: id  // Filter by array of IDs in Farmer table
					}
				}
			};
		} else if (type === 'field_id') {
			whereClause = {
				id: {
					in: id  // Filter by array of IDs in fields table
				}
			};
		}
		
		// Fetch fieldsBook based on the dynamic where clause
		const fieldsBook = await prisma.fields.findMany({
			where: whereClause,
			include: {
				Farmer: true,
				preparation_of_field: true,
				Irrigation: true,
				weed: true,
				fertilizer: true,
				IssueDetected: true,
				disease_and_pest: true,
				harvesting: true,
				Districts: true,
				States: true,
				Tehsils: true
			}
		});
		
		
		res.json(fieldsBook);
	} catch (error) {
		console.error(error); // Log error for debugging
		res.status(500).json({error: error.message});
	}
});

module.exports = router;
