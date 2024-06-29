const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();

router.post('/', async (req, res) => {
	const { id } = req.body;
	console.log('id',id)
	try {
		// Fetch fieldsBook filtered by Farmer.sawie_nr in the provided array
		const fieldsBook = await prisma.fields.findMany({
			where: {
				Farmer: {
					sawie_nr: {
						in: id  // Filter by array of IDs
					}
				}
			},
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
		
		// Fetch farmers filtered by sawie_nr in the provided array
		const farmers = await prisma.farmer.findMany({
			where: {
				sawie_nr: {
					in: id  // Filter by array of IDs
				}
			},
			include: {
				MotorTubeWell: true,
				SolarTubeWell: true,
				FarmerCrop: {
					include: {
						Crop: true,
						CropVariety: true
					}
				},
				Fields: {
					include: {
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
				},
				SuperVisor: true,
				FarmerContactPerson: true
			}
		});
		
		// Return filtered and related data
		const fields = {
			fieldsBook: fieldsBook,
			farmerBook: farmers
		};
		res.json(fields);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
