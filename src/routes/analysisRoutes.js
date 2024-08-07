const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();
const {calculateCostsByCategory, calculateCosts} = require('../../_utlis')

router.post('/', async (req, res) => {
	const {type, id} = req.body;
	const parseID = parseInt(id);
	console.log(typeof parseID);
	if (!type || !id) {
		return res.status(404).json({error: 'Filter Type or Name is null'});
	}
	let FilterID;
	let condition;
	try {
		if (type === 'tehsil') {
			FilterID = await prisma.tehsils.findUnique({where: {id: parseID}});
			condition = {tehsil_id: FilterID.id};
		} else if (type === 'state') {
			FilterID = await prisma.states.findUnique({where: {id: parseID}});
			condition = {state_id: FilterID.id};
		} else if (type === 'district') {
			FilterID = await prisma.districts.findUnique({where: {id: parseID}});
			condition = {district_id: FilterID.id};
		}
		
		
		const fields = await prisma.fields.findMany({
			where: condition, include: {
				Farmer: true,                   // Includes related Farmer data
				preparation_of_field: true,     // Includes related PreparationOfField data
				Irrigation: true,               // Includes related Irrigation data
				weed: true,                     // Includes related WeedTreatment data
				fertilizer: true,               // Includes related Fertilizer data
				IssueDetected: true,            // Includes related IssueDetected data
				disease_and_pest: true,         // Includes related DiseaseAndPest data
				harvesting: true,               // Includes related Harvesting data
				Districts: true,                // Includes related Districts data
				States: true,                   // Includes related States data
				Tehsils: true,                  // Includes related Tehsils data
				sowing: true,
			}
		});
		
		
		// let costs = calculateCostsByCategory(fields);
		let costs = calculateCosts(fields);
		console.log("Cost Breakdown:", costs);
		
		// res.status(200).json({costs: costs, FilterID: FilterID.id, results: fields});
		res.status(200).json({ costs: costs});
	} catch (error) {
		console.log('Error:', error);
		res.status(400).json({error: error.message});
	}
});

module.exports = router;
