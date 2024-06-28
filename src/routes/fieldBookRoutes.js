const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const fields = await prisma.fields.findMany({
			include: {
				Farmer: true,                   // Includes related Farmer data
				PreparationOfField: true,       // Includes related PreparationOfField data
				Irrigation: true,               // Includes related Irrigation data
				WeedTreatment: true,            // Includes related WeedTreatment data
				Fertilizer: true,               // Includes related Fertilizer data
				IssueDetected: true,            // Includes related IssueDetected data
				DiseaseAndPest: true,           // Includes related DiseaseAndPest data
				Harvesting: true,               // Includes related Harvesting data
				Districts: true,                // Includes related Districts data
				States: true,                   // Includes related States data
				Tehsils: true,                  // Includes related Tehsils data
			}
		});
		res.json(fields);
	} catch (error) {
		res.status(500).json({error: error.message});
	}
});


router.post('/', async (req, res) => {
	try {
		const fieldData = req.body;
		let fieldsQuery = []
		if (fieldData.id) {
			fieldsQuery = await prisma.fields.findMany({
				where: {
					id: fieldData.id,
				}, include: {
					Farmer: true,                   // Includes related Farmer data
					PreparationOfField: true,       // Includes related PreparationOfField data
					Irrigation: true,               // Includes related Irrigation data
					WeedTreatment: true,            // Includes related WeedTreatment data
					Fertilizer: true,               // Includes related Fertilizer data
					IssueDetected: true,            // Includes related IssueDetected data
					DiseaseAndPest: true,           // Includes related DiseaseAndPest data
					Harvesting: true,               // Includes related Harvesting data
					Districts: true,                // Includes related Districts data
					States: true,                   // Includes related States data
					Tehsils: true,                  // Includes related Tehsils data
				}
			});
		}
		console.log('Field Already Existing')
		if (fieldsQuery.length > 0) {
			const field = fieldsQuery[0];
			const updatedFieldData = {};
			
			if (field.farmerSawie_nr !== fieldData.farmerSawie_nr) {
				updatedFieldData.farmerSawie_nr = fieldData.farmerSawie_nr;
			}
			if (field.regen_farming !== fieldData.regen_farming) {
				updatedFieldData.regen_farming = fieldData.regen_farming;
			}
			if (field.special_farm_storage_aability !== fieldData.special_farm_storage_aability) {
				updatedFieldData.special_farm_storage_aability = fieldData.special_farm_storage_aability;
			}
			if (field.special_farm_processing_aability !== fieldData.special_farm_processing_aability) {
				updatedFieldData.special_farm_processing_aability = fieldData.special_farm_processing_aability;
			}
			if (field.land_preparation !== fieldData.land_preparation) {
				updatedFieldData.land_preparation = fieldData.land_preparation;
			}
			if (field.field_address !== fieldData.field_address) {
				updatedFieldData.field_address = fieldData.field_address;
			}
			if (field.organic_acres_farmed_again !== fieldData.organic_acres_farmed_again) {
				updatedFieldData.organic_acres_farmed_again = fieldData.organic_acres_farmed_again;
			}
			if (field.area_changed_into_organic !== fieldData.area_changed_into_organic) {
				updatedFieldData.area_changed_into_organic = fieldData.area_changed_into_organic;
			}
			if (field.traditional_farmed_cotton_area !== fieldData.traditional_farmed_cotton_area) {
				updatedFieldData.traditional_farmed_cotton_area = fieldData.traditional_farmed_cotton_area;
			}
			if (field.other_farmed_area !== fieldData.other_farmed_area) {
				updatedFieldData.other_farmed_area = fieldData.other_farmed_area;
			}
			if (field.production_forecast !== fieldData.production_forecast) {
				updatedFieldData.production_forecast = fieldData.production_forecast;
			}
			if (field.ownership !== fieldData.ownership) {
				updatedFieldData.ownership = fieldData.ownership;
			}
			if (field.rain_water !== fieldData.rain_water) {
				updatedFieldData.rain_water = fieldData.rain_water;
			}
			if (field.michung !== fieldData.michung) {
				updatedFieldData.michung = fieldData.michung;
			}
			if (field.green_fertilizer !== fieldData.green_fertilizer) {
				updatedFieldData.green_fertilizer = fieldData.green_fertilizer;
			}
			if (field.trap_crop !== fieldData.trap_crop) {
				updatedFieldData.trap_crop = fieldData.trap_crop;
			}
			if (field.border_crop !== fieldData.border_crop) {
				updatedFieldData.border_crop = fieldData.border_crop;
			}
			if (field.trees_at_edge !== fieldData.trees_at_edge) {
				updatedFieldData.trees_at_edge = fieldData.trees_at_edge;
			}
			if (field.bio_gas_plant !== fieldData.bio_gas_plant) {
				updatedFieldData.bio_gas_plant = fieldData.bio_gas_plant;
			}
			if (field.conversion_of_organisms !== fieldData.conversion_of_organisms) {
				updatedFieldData.conversion_of_organisms = fieldData.conversion_of_organisms;
			}
			if (field.inter_crop !== fieldData.inter_crop) {
				updatedFieldData.inter_crop = fieldData.inter_crop;
			}
			if (field.clear_election !== fieldData.clear_election) {
				updatedFieldData.clear_election = fieldData.clear_election;
			}
			if (field.method_of_irrigation !== fieldData.method_of_irrigation) {
				updatedFieldData.method_of_irrigation = fieldData.method_of_irrigation;
			}
			if (field.mapped_digitalized !== fieldData.mapped_digitalized) {
				updatedFieldData.mapped_digitalized = fieldData.mapped_digitalized;
			}
			if (field.crop_id !== fieldData.crop_id) {
				updatedFieldData.crop_id = fieldData.crop_id;
			}
			if (field.tehsil_id !== fieldData.tehsil_id) {
				updatedFieldData.tehsil_id = fieldData.tehsil_id;
			}
			if (field.state_id !== fieldData.state_id) {
				updatedFieldData.state_id = fieldData.state_id;
			}
			if (field.district_id !== fieldData.district_id) {
				updatedFieldData.district_id = fieldData.district_id;
			}
			if (field.country_id !== fieldData.country_id) {
				updatedFieldData.country_id = fieldData.country_id;
			}
			if (field.present_crop !== fieldData.present_crop) {
				updatedFieldData.present_crop = fieldData.present_crop;
			}
			if (field.present_crop_v !== fieldData.present_crop_v) {
				updatedFieldData.present_crop_v = fieldData.present_crop_v;
			}
			if (field.prev_crop !== fieldData.prev_crop) {
				updatedFieldData.prev_crop = fieldData.prev_crop;
			}
			if (field.prev_crop_v !== fieldData.prev_crop_v) {
				updatedFieldData.prev_crop_v = fieldData.prev_crop_v;
			}
			if (field.field_name !== fieldData.field_name) {
				updatedFieldData.field_name = fieldData.field_name;
			}
			
			console.log('updatedFieldData', updatedFieldData);
			if (Object.keys(updatedFieldData).length > 0) {
				const addedField = await prisma.fields.update({
					where: {id: fieldData.id}, data: updatedFieldData,
				});
				console.log('addedFieldData', addedField);
			}
			
			
			if (fieldData.farmer) {
				const farmer = fieldData.farmer
				let existingFarmerArray = []
				if (farmer.sawie_nr) {
					existingFarmerArray = await prisma.farmer.findMany({
						where: {
							sawie_nr: farmer.sawie_nr
						}
					});
					console.log('existingFarmer:', existingFarmerArray)
					if (existingFarmerArray.length > 0) {
						const updateFarmerData = {};
						const existingFarmer = existingFarmerArray[0]
						if (existingFarmer.name !== farmer.name) updateFarmerData.name = farmer.name;
						if (existingFarmer.father_name !== farmer.father_name) updateFarmerData.father_name = farmer.father_name;
						if (existingFarmer.phone !== farmer.phone) updateFarmerData.phone = farmer.phone;
						if (existingFarmer.state !== farmer.state) updateFarmerData.state = farmer.state;
						if (existingFarmer.tehsil !== farmer.tehsil) updateFarmerData.tehsil = farmer.tehsil;
						if (existingFarmer.district !== farmer.district) updateFarmerData.district = farmer.district;
						if (existingFarmer.farmer_address !== farmer.farmer_address) updateFarmerData.farmer_address = farmer.farmer_address;
						if (existingFarmer.farmer_contact_person_id !== farmer.farmer_contact_person_id) updateFarmerData.farmer_contact_person_id = farmer.farmer_contact_person_id;
						if (existingFarmer.super_visor_id !== farmer.super_visor_id) updateFarmerData.super_visor_id = farmer.super_visor_id;
						if (existingFarmer.labour_costs_male !== farmer.labour_costs_male) updateFarmerData.labour_costs_male = farmer.labour_costs_male;
						if (existingFarmer.labour_costs_female !== farmer.labour_costs_female) updateFarmerData.labour_costs_female = farmer.labour_costs_female;
						console.log('updateFarmerData :', updateFarmerData)
						if (Object.keys(updateFarmerData).length > 0) {
							const upDatedFarmer = await prisma.farmer.update({
								where: {sawie_nr: farmer.sawie_nr}, data: {...updateFarmerData}
							});
							console.log('upDatedFarmer:', upDatedFarmer)
						}
					}
				} else {
					
					const newFarmer = await prisma.farmer.create({
						data: {
							...farmer
						}
					})
					console.log('newFarmer:', newFarmer)
					
				}
				
			}
			
			if (fieldData.preparation_of_field) {
				for (const preparation of fieldData.preparation_of_field) {
					let existingPreparation = [];
					if (preparation.id) {
						existingPreparation = await prisma.preparationOfField.findMany({
							where: {
								id: preparation.id,
							}
						})
					}
					console.log('existingPreparation:', existingPreparation)
					if (existingPreparation.length > 0) {
						const updatedPreparationData = {};
						const existingPreparationIndex = existingPreparation[0]
						if (existingPreparationIndex.levelalized !== preparation.levelalized) updatedPreparationData.levelalized = preparation.levelalized;
						if (existingPreparationIndex.completion_date !== preparation.completion_date) updatedPreparationData.completion_date = preparation.completion_date;
						if (existingPreparationIndex.activities !== preparation.activities) updatedPreparationData.activities = preparation.activities;
						if (existingPreparationIndex.male_labour_hours !== preparation.male_labour_hours) updatedPreparationData.male_labour_hours = preparation.male_labour_hours;
						if (existingPreparationIndex.female_labour_hours !== preparation.female_labour_hours) updatedPreparationData.female_labour_hours = preparation.female_labour_hours;
						
						console.log('updatedPreparationData : ', updatedPreparationData)
						
						if (Object.keys(updatedPreparationData).length > 0) {
							await prisma.preparationOfField.update({
								where: {id: preparation.id}, data: {...updatedPreparationData, field_id: field.id},
							});
						}
					} else {
						
						const addedPrep = await prisma.preparationOfField.create({
							data: {
								...preparation, field_id: field.id
							}
						});
						console.log('preparation created', addedPrep);
					}
				}
				
			}
			
			if (fieldData.Irrigation) {
				for (const irrigation of fieldData.Irrigation) {
					
					var existingIrrigation2 = []
					if (irrigation.id) {
						existingIrrigation2 = await prisma.irrigation.findMany({
							where: {
								id: irrigation.id
							}
						});
					}
					console.log('existingIrrigation:', existingIrrigation2)
					
					if (existingIrrigation2.length > 0) {
						const updatedIrrigationData = {};
						const existingIrrigation = existingIrrigation2[0]
						if (existingIrrigation.irrigation_date !== irrigation.irrigation_date) updatedIrrigationData.irrigation_date = irrigation.irrigation_date;
						if (existingIrrigation.male_labour_hours !== irrigation.male_labour_hours) updatedIrrigationData.male_labour_hours = irrigation.male_labour_hours;
						if (existingIrrigation.female_labour_hours !== irrigation.female_labour_hours) updatedIrrigationData.female_labour_hours = irrigation.female_labour_hours;
						if (existingIrrigation.unit_m3 !== irrigation.unit_m3) updatedIrrigationData.unit_m3 = irrigation.unit_m3;
						if (existingIrrigation.source_of_irrigation !== irrigation.source_of_irrigation) updatedIrrigationData.source_of_irrigation = irrigation.source_of_irrigation;
						if (existingIrrigation.cost_acre !== irrigation.cost_acre) updatedIrrigationData.cost_acre = irrigation.cost_acre;
						console.log('updatedIrrigationData:', updatedIrrigationData)
						if (Object.keys(updatedIrrigationData).length > 0) {
							await prisma.irrigation.update({
								where: {id: irrigation.id}, data: {...updatedIrrigationData, field_id: field.id}
							});
						}
					} else {
						
						const addedIrrigation = await prisma.irrigation.create({
							data: {
								...irrigation, field_id: field.id
							}
						});
						console.log('irrigation created', addedIrrigation);
					}
				}
			}
			
			if (fieldData.weed) {
				for (const weed of fieldData.weed) {
					var existingWeed2 = []
					if (weed.id) {
						existingWeed2 = await prisma.weedTreatment.findMany({
							where: {
								id: weed.id
							}
						});
					}
					console.log('existingWeed:', existingWeed2)
					
					if (existingWeed2.length > 0) {
						const updatedWeedData = {};
						const existingWeed = existingWeed2[0]
						if (existingWeed.weed_date !== weed.weed_date) updatedWeedData.weed_date = weed.weed_date;
						if (existingWeed.activity !== weed.activity) updatedWeedData.activity = weed.activity;
						if (existingWeed.title_of_product !== weed.title_of_product) updatedWeedData.title_of_product = weed.title_of_product;
						if (existingWeed.quantity !== weed.quantity) updatedWeedData.quantity = weed.quantity;
						if (existingWeed.quantity_unit !== weed.quantity_unit) updatedWeedData.quantity_unit = weed.quantity_unit;
						if (existingWeed.male_labour_hours !== weed.male_labour_hours) updatedWeedData.male_labour_hours = weed.male_labour_hours;
						if (existingWeed.female_labour_hours !== weed.female_labour_hours) updatedWeedData.female_labour_hours = weed.female_labour_hours;
						if (existingWeed.cost_per_acer !== weed.cost_per_acer) updatedWeedData.cost_per_acer = weed.cost_per_acer;
						
						if (Object.keys(updatedWeedData).length > 0) {
							await prisma.weedTreatment.update({
								where: {id: weed.id}, data: {...updatedWeedData, field_id: field.id}
							});
						}
					} else {
						
						const addedWeed = await prisma.weedTreatment.create({
							data: {
								...weed, field_id: field.id
							}
						});
						console.log('addedWeed :', addedWeed)
					}
				}
			}
			
			if (fieldData.fertilizer) {
				for (const fertilizer of fieldData.fertilizer) {
					existingFertilizer2 = []
					if (fertilizer.id) {
						existingFertilizer2 = await prisma.fertilizer.findMany({
							where: {
								id: fertilizer.id
							}
						});
					}
					console.log('existingFertilizer:', existingFertilizer2)
					
					if (existingFertilizer2.length > 0) {
						const updatedFertilizerData = {};
						const existingFertilizer = existingFertilizer2[0]
						if (existingFertilizer.fertilizer_date !== fertilizer.fertilizer_date) updatedFertilizerData.fertilizer_date = fertilizer.fertilizer_date;
						if (existingFertilizer.male_labour_hours !== fertilizer.male_labour_hours) updatedFertilizerData.male_labour_hours = fertilizer.male_labour_hours;
						if (existingFertilizer.female_labour_hours !== fertilizer.female_labour_hours) updatedFertilizerData.female_labour_hours = fertilizer.female_labour_hours;
						if (existingFertilizer.type_of_fertilizer !== fertilizer.type_of_fertilizer) updatedFertilizerData.type_of_fertilizer = fertilizer.type_of_fertilizer;
						if (existingFertilizer.quantity !== fertilizer.quantity) updatedFertilizerData.quantity = fertilizer.quantity;
						if (existingFertilizer.quantity_unit !== fertilizer.quantity_unit) updatedFertilizerData.quantity_unit = fertilizer.quantity_unit;
						if (existingFertilizer.fertilizer_cost !== fertilizer.fertilizer_cost) updatedFertilizerData.fertilizer_cost = fertilizer.fertilizer_cost;
						if (existingFertilizer.cost_per_acer !== fertilizer.cost_per_acer) updatedFertilizerData.cost_per_acer = fertilizer.cost_per_acer;
						
						if (Object.keys(updatedFertilizerData).length > 0) {
							await prisma.fertilizer.update({
								where: {id: fertilizer.id}, data: {...updatedFertilizerData, field_id: field.id}
							});
						}
					} else {
						
						const addedFertilizer = await prisma.fertilizer.create({
							data: {
								...fertilizer, field_id: field.id
							}
						});
						console.log('addedFertilizer:', addedFertilizer)
					}
				}
			}
			
			if (fieldData.IssueDetected) {
				for (const issue of fieldData.IssueDetected) {
					
					var existingIssue2 = []
					
					if (issue.id) {
						existingIssue2 = await prisma.issueDetected.findMany({
							where: {
								id: issue.id
							}
						});
					}
					
					console.log('existingIssue', existingIssue2)
					if (existingIssue2.length > 0) {
						const updatedIssueData = {};
						const existingIssue = existingIssue2[0]
						if (existingIssue.issue_date !== issue.issue_date) updatedIssueData.issue_date = issue.issue_date;
						if (existingIssue.issue_name !== issue.issue_name) updatedIssueData.issue_name = issue.issue_name;
						if (existingIssue.issue_calssification !== issue.issue_calssification) updatedIssueData.issue_calssification = issue.issue_calssification;
						if (existingIssue.male_labour_hours !== issue.male_labour_hours) updatedIssueData.male_labour_hours = issue.male_labour_hours;
						if (existingIssue.female_labour_hours !== issue.female_labour_hours) updatedIssueData.female_labour_hours = issue.female_labour_hours;
						if (existingIssue.issue_cost !== issue.issue_cost) updatedIssueData.issue_cost = issue.issue_cost;
						if (existingIssue.cost_per_acer !== issue.cost_per_acer) updatedIssueData.cost_per_acer = issue.cost_per_acer;
						
						if (Object.keys(updatedIssueData).length > 0) {
							await prisma.issueDetected.update({
								where: {id: issue.id}, data: {...updatedIssueData, field_id: field.id}
							});
						}
					} else {
						const addedFertilizer = await prisma.issueDetected.create({
							data: {
								...issue, field_id: field.id
							}
						});
						console.log('addedIssue :', addedFertilizer)
					}
				}
			}
			
			if (fieldData.disease_and_pest) {
				for (const disease of fieldData.disease_and_pest) {
					var existingDisease2 = []
					if (disease.id) {
						existingDisease2 = await prisma.diseaseAndPest.findMany({
							where: {
								id: disease.id
							}
						});
					}
					console.log('existingDisease', existingDisease2)
					if (existingDisease2.length > 0) {
						const updatedDiseaseData = {};
						const existingDisease = existingDisease2[0]
						if (existingDisease.disease_date !== disease.disease_date) updatedDiseaseData.disease_date = disease.disease_date;
						if (existingDisease.cost !== disease.cost) updatedDiseaseData.cost = disease.cost;
						if (existingDisease.product !== disease.product) updatedDiseaseData.product = disease.product;
						if (existingDisease.male_labour_hours !== disease.male_labour_hours) updatedDiseaseData.male_labour_hours = disease.male_labour_hours;
						if (existingDisease.female_labour_hours !== disease.female_labour_hours) updatedDiseaseData.female_labour_hours = disease.female_labour_hours;
						if (existingDisease.quantity !== disease.quantity) updatedDiseaseData.quantity = disease.quantity;
						if (existingDisease.quantity_unit !== disease.quantity_unit) updatedDiseaseData.quantity_unit = disease.quantity_unit;
						if (existingDisease.cost_per_acer !== disease.cost_per_acer) updatedDiseaseData.cost_per_acer = disease.cost_per_acer;
						
						if (Object.keys(updatedDiseaseData).length > 0) {
							await prisma.diseaseAndPest.update({
								where: {id: disease.id}, data: {...updatedDiseaseData, field_id: field.id}
							});
						}
					} else {
						const addedDisease = await prisma.diseaseAndPest.create({
							data: {
								...disease, field_id: field.id
							}
						});
						console.log('addedDisease :', addedDisease)
					}
				}
			}
			
			if (fieldData.harvesting) {
				for (const harvest of fieldData.harvesting) {
					var existingHarvest2 = []
					if (harvest.id) {
						existingHarvest2 = await prisma.harvesting.findMany({
							where: {
								id: harvest.id
							}
						});
					}
					console.log('existingHarvest', existingHarvest2)
					if (existingHarvest2.length > 0) {
						const updatedHarvestData = {};
						const existingHarvest = existingHarvest2[0]
						if (existingHarvest.est_date_of_harvesting !== harvest.est_date_of_harvesting) updatedHarvestData.est_date_of_harvesting = harvest.est_date_of_harvesting;
						if (existingHarvest.date_of_completion !== harvest.date_of_completion) updatedHarvestData.date_of_completion = harvest.date_of_completion;
						if (existingHarvest.est_yield !== harvest.est_yield) updatedHarvestData.est_yield = harvest.est_yield;
						if (existingHarvest.harvested_yield !== harvest.harvested_yield) updatedHarvestData.harvested_yield = harvest.harvested_yield;
						if (existingHarvest.male_labour_hours !== harvest.male_labour_hours) updatedHarvestData.male_labour_hours = harvest.male_labour_hours;
						if (existingHarvest.female_labour_hours !== harvest.female_labour_hours) updatedHarvestData.female_labour_hours = harvest.female_labour_hours;
						if (existingHarvest.mechanisation !== harvest.mechanisation) updatedHarvestData.mechanisation = harvest.mechanisation;
						if (existingHarvest.cost_per_acer !== harvest.cost_per_acer) updatedHarvestData.cost_per_acer = harvest.cost_per_acer;
						if (existingHarvest.total_cost !== harvest.total_cost) updatedHarvestData.total_cost = harvest.total_cost;
						
						if (Object.keys(updatedHarvestData).length > 0) {
							await prisma.harvesting.update({
								where: {id: harvest.id}, data: {...updatedHarvestData, field_id: field.id}
							});
						}
					} else {
						const addedHarvesting = await prisma.harvesting.create({
							data: {
								...harvest, field_id: field.id
							}
						});
						console.log('addedHarvesting :', addedHarvesting)
					}
				}
			}
			
			
			if (fieldData.crop) {
				const crop = fieldData.crop
				let existingCropArray = []
				if (crop.id) {
					existingCropArray = await prisma.crop.findMany({
						where: {
							id: crop.id
						}
					});
					console.log('existingCropArray:', existingCropArray)
					if (existingCropArray.length > 0) {
						const updateCropData = {};
						const existingFarmer = existingCropArray[0]
						
						if (existingFarmer.crop_name !== crop.crop_name) updateCropData.crop_name = crop.crop_name;
						
						console.log('updateCropData :', updateCropData)
						if (Object.keys(updateCropData).length > 0) {
							const upDatedFarmer = await prisma.crop.update({
								where: {id: crop.id}, data: {...updateCropData}
							});
							console.log('upDatedFarmer:', upDatedFarmer)
						}
					}
				} else {
					
					const newCrop = await prisma.farmer.create({
						data: {
							...crop
						}
					})
					console.log('newCrop:', newCrop)
					
				}
				www
			}
			
			
		} else {
			console.log('do nothing - logic will be added later')
			res.status(200).json({success: true})
		}
	} catch (error) {
		res.status(500).json({error: error.message});
	}
})
module.exports = router;

