const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();


router.post('/', async (req, res) => {
	try {
		
		const {
			sawie_nr,
			farmer_name,
			cnic,
			father_name,
			tehsil_id,
			phone,
			address,
			field_name,
			field_address, //coordinates
			total_area, //field_area
			crop_id,
			sowing_date,
			harvesting_date,
		} = req.body;
		
		let Farmer;
		let Field;
		let tehsil;
		let sowing;
		let harvesting;
		
		if (tehsil_id) {
			tehsil = await prisma.tehsils.findUnique({
				where: {id: tehsil_id},
				select: {
					state_id: true,
					district_id: true,
				},
			});
		}
		
		
		if (!sawie_nr) {
			Farmer = await prisma.farmer.create({
				data: {
					name: farmer_name,
					father_name: father_name,
					phone: phone,
					cnic: cnic,
					state: tehsil.state_id,
					tehsil: tehsil_id.toString(),
					district: tehsil.district_id,
					farmer_address: address,
					farmer_contact_person_id: 1,
					super_visor_id: 1,
					labour_costs_female: null,
					labour_costs_male: null
				}
			})
		} else {
			Farmer = await prisma.farmer.findUnique({
				where: {
					sawie_nr: sawie_nr,
				}
			})
		}
		
		
		if (Farmer && tehsil.state_id && tehsil.district_id && tehsil_id) {
			Field = await prisma.fields.create({
				data: {
					field_address: field_address,
					total_area: total_area,
					country_id: 1,
					district_id: tehsil.district_id,
					state_id: tehsil.state_id,
					tehsil_id: tehsil_id,
					farmerSawie_nr: Farmer.sawie_nr,
					field_name: field_name,
					crop_id: crop_id,
					regen_farming: null,
					special_farm_storage_aability: null,
					special_farm_processing_aability: null,
					land_preparation: null,
					organic_acres_farmed_again: null,
					area_changed_into_organic: null,
					traditional_farmed_cotton_area: null,
					other_farmed_area: null,
					production_forecast: null,
					bio_gas_plant: null,
					border_crop: null,
					clear_election: null,
					conversion_of_organisms: null,
					green_fertilizer: null,
					inter_crop: null,
					mapped_digitalized: null,
					method_of_irrigation: null,
					michung: null,
					ownership: null,
					rain_water: null,
					trap_crop: null,
					trees_at_edge: null,
					present_crop: null,
					present_crop_v: null,
					prev_crop: null,
					prev_crop_v: null
				}
			})
		}
		
		if (Field && sowing_date) {
			sowing = await prisma.sowing.create({
				data: {
					sowing_date: sowing_date,
					crop_id: crop_id,
					crop_variety_id: 73,
					male_labour_hours: null,
					female_labour_hours: null,
					kg_sown: null,
					price_per_kg: null,
					field_id: Field.id
				}
			})
			
			
		}
		
		if (Field && harvesting_date) {
			harvesting = await prisma.harvesting.create({
				data: {
					est_date_of_harvesting: null,
					date_of_completion: harvesting_date,
					est_yield: null,
					harvested_yield: null,
					field_id: Field.id,
					cost_per_acer: null,
					female_labour_hours: null,
					male_labour_hours: null,
					mechanisation: null,
					total_cost: null
				}
			})
		}
		
		res.status(201).json({success: true, Farmer, Field, sowing, harvesting});
	} catch (error) {
		res.status(500).json({error: error.message});
	}
});


module.exports = router;
