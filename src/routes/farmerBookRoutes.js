// src/routes/farmerBookRoutes.js
const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const farmers = await prisma.farmer.findMany({
			include: {
				motor_tube_well: true,
				solar_tube_well: true,
				FarmerCrop: {
					include: {
						Crop: true,
						CropVariety: true
					}
				},
				Fields: {
					include: {
						preparation_of_field: true, // Updated to match schema field name
						Irrigation: true,
						weed: true, // Updated to match schema field name
						fertilizer: true,
						IssueDetected: true,
						disease_and_pest: true, // Updated to match schema field name
						harvesting: true, // Updated to match schema field name
						Districts: true,          // Adjusted for correct naming
						States: true,             // Adjusted for correct naming
						Tehsils: true,
						sowing: true,
					}
				},
				supervisor: true,
				FarmerContactPerson: true,
				training: true
			}
		});
		res.json(farmers);
	} catch (error) {
		console.log('Error:', error)
		res.status(500).json({error: error.message});
	}
});


router.post('/', async (req, res) => {
	var alreadyExistField = false;
	try {
		const farmData = req.body;
		
		// Retrieve existing data
		const farmerQuery = await prisma.farmer.findMany({
			where:
				{sawie_nr: farmData?.sawie_nr},
			
			
			include: {
				motor_tube_well: true,          // Assuming this is the correct relation name
				solar_tube_well: true,          // Assuming this is the correct relation name
				FarmerCrop: {
					include: {
						Crop: true,               // Assuming 'Crop' is correctly defined
						CropVariety: true         // Assuming 'CropVariety' is correctly defined
					}
				},
				Fields: {
					include: {
						preparation_of_field: true, // Adjusted for correct naming
						Irrigation: true,
						weed: true,      // Adjusted for correct naming
						fertilizer: true,
						IssueDetected: true,
						disease_and_pest: true,     // Adjusted for correct naming
						harvesting: true,
						Districts: true,          // Adjusted for correct naming
						States: true,             // Adjusted for correct naming
						Tehsils: true,             // Adjusted for correct naming
						sowing: true,
					}
				},
				supervisor: true,            // Adjusted for correct naming
				FarmerContactPerson: true,   // Assuming this is correctly defined
				training: true
				
			}
		});
		
		console.log('farmerQuery : ', farmerQuery)
		// If farmer data exists, compare and update as necessary
		if (farmerQuery.length > 0) {
			const farmer = farmerQuery[0];
			
			// Compare and update Farmer model
			const updatedFarmerData = {};
			if (farmer.name !== farmData.name) updatedFarmerData.name = farmData.name;
			if (farmer.father_name !== farmData.father_name) updatedFarmerData.father_name = farmData.father_name;
			if (farmer.phone !== farmData.phone) updatedFarmerData.phone = farmData.phone;
			if (farmer.state !== farmData.state) updatedFarmerData.state = farmData.state;
			if (farmer.tehsil !== farmData.tehsil) updatedFarmerData.tehsil = farmData.tehsil;
			if (farmer.district !== farmData.district) updatedFarmerData.district = farmData.district;
			if (farmer.farmer_address !== farmData.farmer_address) updatedFarmerData.farmer_address = farmData.farmer_address;
			if (farmer.farmer_contact_person_id !== farmData.farmer_contact_person_id) updatedFarmerData.farmer_contact_person_id = farmData.farmer_contact_person_id;
			if (farmer.super_visor_id !== farmData.super_visor_id) updatedFarmerData.super_visor_id = farmData.super_visor_id;
			if (farmer.labour_costs_male !== farmData.labour_costs_male) updatedFarmerData.labour_costs_male = farmData.labour_costs_male;
			if (farmer.labour_costs_female !== farmData.labour_costs_female) updatedFarmerData.labour_costs_female = farmData.labour_costs_female;
			if (farmer.canal_cost_cubic_m !== farmData.canal_cost_cubic_m) updatedFarmerData.canal_cost_cubic_m = farmData.canal_cost_cubic_m;
			if (farmer.canal_cost_hour !== farmData.canal_cost_hour) updatedFarmerData.canal_cost_hour = farmData.canal_cost_hour;
			if (farmer.crop_name !== farmData.crop_name) updatedFarmerData.crop_name = farmData.crop_name;
			if (farmer.date_purchasing_seed !== farmData.date_purchasing_seed) updatedFarmerData.date_purchasing_seed = farmData.date_purchasing_seed;
			if (farmer.organic_again !== farmData.organic_again) updatedFarmerData.organic_again = farmData.organic_again;
			if (farmer.organic_changed !== farmData.organic_changed) updatedFarmerData.organic_changed = farmData.organic_changed;
			if (farmer.other_area !== farmData.other_area) updatedFarmerData.other_area = farmData.other_area;
			if (farmer.production_forecast !== farmData.production_forecast) updatedFarmerData.production_forecast = farmData.production_forecast;
			if (farmer.regen_farming !== farmData.regen_farming) updatedFarmerData.regen_farming = farmData.regen_farming;
			if (farmer.seed_quantity !== farmData.seed_quantity) updatedFarmerData.seed_quantity = farmData.seed_quantity;
			if (farmer.seed_source !== farmData.seed_source) updatedFarmerData.seed_source = farmData.seed_source;
			if (farmer.seed_type !== farmData.seed_type) updatedFarmerData.seed_type = farmData.seed_type;
			if (farmer.special_farm_processing_aability !== farmData.special_farm_processing_aability) updatedFarmerData.special_farm_processing_aability = farmData.special_farm_processing_aability;
			if (farmer.special_farm_storage_aability !== farmData.special_farm_storage_aability) updatedFarmerData.special_farm_storage_aability = farmData.special_farm_storage_aability;
			if (farmer.total_seed_price !== farmData.total_seed_price) updatedFarmerData.total_seed_price = farmData.total_seed_price;
			if (farmer.traditional !== farmData.traditional) updatedFarmerData.traditional = farmData.traditional;
			console.log('updatedFarmerData :', updatedFarmerData)
			
			if (Object.keys(updatedFarmerData).length > 0) {
				const UpdatedFarmer = await prisma.farmer.update({
					where: {sawie_nr: farmData.sawie_nr}, data: updatedFarmerData
				});
				console.log('Updated Farmer : ', UpdatedFarmer)
			}
			// Update supervisor
// Update or create Supervisor
			if (farmData.supervisor) {
				const updatedSupervisorData = {};
				if (farmer.supervisor && farmer.supervisor.type !== farmData.supervisor.type) updatedSupervisorData.type = farmData.supervisor.type;
				if (farmer.supervisor && farmer.supervisor.name !== farmData.supervisor.name) updatedSupervisorData.name = farmData.supervisor.name;
				if (farmer.supervisor && farmer.supervisor.number !== farmData.supervisor.number) updatedSupervisorData.number = farmData.supervisor.number;
				if (farmer.supervisor && farmer.supervisor.company !== farmData.supervisor.company) updatedSupervisorData.company = farmData.supervisor.company;
				console.log('updatedSupervisorData : ', updatedSupervisorData);
				
				if (Object.keys(updatedSupervisorData).length > 0) {
					if (farmData.supervisor && farmData.supervisor.id) {
						console.log('Updating Supervisor with ID:', farmer.supervisor.id);
						const UpdatedSuperVisor = await prisma.SuperVisor.update({
							where: {id: farmer.supervisor.id},
							data: updatedSupervisorData
						});
						console.log('UpdatedSuperVisor:', UpdatedSuperVisor);
					} else {
						console.log('Creating new Supervisor');
						const newSuperVisor = await prisma.SuperVisor.create({data: farmData.supervisor});
						const UpdatedFarmerDataOFSuperVisorID = await prisma.farmer.update({
							where: {sawie_nr: farmData.sawie_nr}, data: {super_visor_id: newSuperVisor.id}
						});
						console.log('newSuperVisor', newSuperVisor);
						console.log('UpdatedFarmerDataOFSuperVisorID', UpdatedFarmerDataOFSuperVisorID);
					}
				}
			}


// Update or create Training
			if (farmData.training) {
				const updatedtrainingData = {};
				
				if (farmer.training) {
					if (farmer.training.month !== farmData.training.month) updatedtrainingData.month = farmData.training.month;
					if (farmer.training.topic !== farmData.training.topic) updatedtrainingData.topic = farmData.training.topic;
					if (farmer.training.trainer_name !== farmData.training.trainer_name) updatedtrainingData.trainer_name = farmData.training.trainer_name;
					if (farmer.training.idea !== farmData.training.idea) updatedtrainingData.idea = farmData.training.idea;
					if (farmer.training.farmerSawie_nr !== farmData.training.farmerSawie_nr) updatedtrainingData.farmerSawie_nr = farmData.training.farmerSawie_nr;
					
					
					console.log('updatedtrainingData : ', updatedtrainingData);
					
					if (Object.keys(updatedtrainingData).length > 0) {
						if (farmer.training && farmer.training.id) {
							console.log('Updating Training with ID:', farmer.training.id);
							await prisma.Training.update({
								where: {id: farmer.training.id},
								data: updatedtrainingData
							});
						} else {
							console.log('Creating new Training');
							await prisma.Training.create({data: farmData.training});
						}
					}
				} else {
					console.log('Creating new Training');
					await prisma.Training.create({data: farmData.training});
				}
			}

// Update or create SolarTubeWell
			if (farmData.solar_tube_well && Object.keys(farmData.solar_tube_well).length > 0) {
				const updatedsolar_tube_wellData = {};
				
				if (farmer.solar_tube_well) {
					if (farmer.solar_tube_well.activity_date !== farmData.solar_tube_well.activity_date) updatedsolar_tube_wellData.activity_date = farmData.solar_tube_well.activity_date;
					if (farmer.solar_tube_well.repairing_costs !== farmData.solar_tube_well.repairing_costs) updatedsolar_tube_wellData.repairing_costs = farmData.solar_tube_well.repairing_costs;
					if (farmer.solar_tube_well.manageing_hours !== farmData.solar_tube_well.manageing_hours) updatedsolar_tube_wellData.manageing_hours = farmData.solar_tube_well.manageing_hours;
					if (farmer.solar_tube_well.costs_per_hour !== farmData.solar_tube_well.costs_per_hour) updatedsolar_tube_wellData.costs_per_hour = farmData.solar_tube_well.costs_per_hour;
					
					console.log('updatedSolar_tube_wellData : ', updatedsolar_tube_wellData);
					
					if (Object.keys(updatedsolar_tube_wellData).length > 0) {
						if (farmer.solar_tube_well.id) {
							console.log('Updating SolarTubeWell with ID:', farmer.solar_tube_well.id);
							await prisma.SolarTubeWell.update({
								where: {id: farmer.solar_tube_well.id},
								data: updatedsolar_tube_wellData
							});
						} else {
							console.log('Creating new SolarTubeWell');
							await prisma.SolarTubeWell.create({data: farmer.solar_tube_well});
						}
					}
				} else {
					console.log('Creating new SolarTubeWell');
					await prisma.SolarTubeWell.create({data: farmData.solar_tube_well});
				}
			}
			
			if (farmData.motor_tube_well && Object.keys(farmData.motor_tube_well).length > 0) {
				const updatedmotor_tube_wellData = {};
				if (farmer.motor_tube_well) {
					if (farmer.motor_tube_well.activity_date !== farmData.motor_tube_well.activity_date) updatedmotor_tube_wellData.activity_date = farmData.motor_tube_well.activity_date;
					if (farmer.motor_tube_well.repairing_costs !== farmData.motor_tube_well.repairing_costs) updatedmotor_tube_wellData.repairing_costs = farmData.motor_tube_well.repairing_costs;
					if (farmer.motor_tube_well.manageing_hours !== farmData.motor_tube_well.manageing_hours) updatedmotor_tube_wellData.manageing_hours = farmData.motor_tube_well.manageing_hours;
					if (farmer.motor_tube_well.diesel_quantity !== farmData.motor_tube_well.diesel_quantity) updatedmotor_tube_wellData.diesel_quantity = farmData.motor_tube_well.diesel_quantity;
					if (farmer.motor_tube_well.costs_per_hour !== farmData.motor_tube_well.costs_per_hour) updatedmotor_tube_wellData.costs_per_hour = farmData.motor_tube_well.costs_per_hour;
					if (farmer.motor_tube_well.costs_per_liter !== farmData.motor_tube_well.costs_per_liter) updatedmotor_tube_wellData.costs_per_liter = farmData.motor_tube_well.costs_per_liter;
					
					console.log('updatedmotor_tube_wellData : ', updatedmotor_tube_wellData);
					
					if (Object.keys(updatedmotor_tube_wellData).length > 0) {
						if (farmer.motor_tube_well.id) {
							console.log('Updating MotorTubeWell with ID:', farmer.motor_tube_well.id);
							
							await prisma.MotorTubeWell.update({
								where: {id: farmer.motor_tube_well.id},
								data: updatedmotor_tube_wellData
							});
						} else {
							console.log('Creating new MotorTubeWell');
							await prisma.MotorTubeWell.create({data: farmer.motor_tube_well});
						}
					}
				} else {
					console.log('Creating new SolarTubeWell');
					await prisma.MotorTubeWell.create({data: farmData.motor_tube_well});
				}
			}
			
			
		} else {
			res.status(404).json({error: 'Sawie number Does not exist'});
		}
		
		res.json({success: true});
		
	} catch (error) {
		console.log(error)
		res.status(500).json({error: error.message});
	}
});


module.exports = router;

