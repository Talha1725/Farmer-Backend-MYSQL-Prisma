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
            // Check and update related entities like Fields, supervisor, FarmerContactPerson, etc.
            if (farmData.Fields) {
                for (const field of farmData.Fields) {
                    const {
                        preparation_of_field,
                        Irrigation,
                        weed,
                        fertilizer,
                        IssueDetected,
                        disease_and_pest,
                        harvesting,
                        ...fieldsWithoutNestedProperties
                    } = field;

                    const existingField = farmer.Fields.find(f => f.id === field.id);
                    // field.id === body
                    // farmer = query
                    console.log('existingField :', existingField)
                    var addedField;
                    if (existingField) {
                        alreadyExistField = true
                        const updatedFieldData = {};
                        if (existingField.field_address !== field.field_address) updatedFieldData.field_address = field.field_address;
                        if (existingField.organic_acres_farmed_again !== field.organic_acres_farmed_again) updatedFieldData.organic_acres_farmed_again = field.organic_acres_farmed_again;
                        if (existingField.area_changed_into_organic !== field.area_changed_into_organic) updatedFieldData.area_changed_into_organic = field.area_changed_into_organic;
                        if (existingField.traditional_farmed_cotton_area !== field.traditional_farmed_cotton_area) updatedFieldData.traditional_farmed_cotton_area = field.traditional_farmed_cotton_area;
                        if (existingField.other_farmed_area !== field.other_farmed_area) updatedFieldData.other_farmed_area = field.other_farmed_area;
                        if (existingField.production_forecast !== field.production_forecast) updatedFieldData.production_forecast = field.production_forecast;
                        if (existingField.ownership !== field.ownership) updatedFieldData.ownership = field.ownership;
                        if (existingField.rain_water !== field.rain_water) updatedFieldData.rain_water = field.rain_water;
                        if (existingField.michung !== field.michung) updatedFieldData.michung = field.michung;
                        if (existingField.green_fertilizer !== field.green_fertilizer) updatedFieldData.green_fertilizer = field.green_fertilizer;
                        if (existingField.trap_crop !== field.trap_crop) updatedFieldData.trap_crop = field.trap_crop;
                        if (existingField.border_crop !== field.border_crop) updatedFieldData.border_crop = field.border_crop;
                        if (existingField.trees_at_edge !== field.trees_at_edge) updatedFieldData.trees_at_edge = field.trees_at_edge;
                        if (existingField.bio_gas_plant !== field.bio_gas_plant) updatedFieldData.bio_gas_plant = field.bio_gas_plant;
                        if (existingField.conversion_of_organisms !== field.conversion_of_organisms) updatedFieldData.conversion_of_organisms = field.conversion_of_organisms;
                        if (existingField.inter_crop !== field.inter_crop) updatedFieldData.inter_crop = field.inter_crop;
                        if (existingField.clear_election !== field.clear_election) updatedFieldData.clear_election = field.clear_election;
                        if (existingField.method_of_irrigation !== field.method_of_irrigation) updatedFieldData.method_of_irrigation = field.method_of_irrigation;
                        if (existingField.mapped_digitalized !== field.mapped_digitalized) updatedFieldData.mapped_digitalized = field.mapped_digitalized;

                        // console.log('updatedFieldData : ', updatedFieldData)

                        if (Object.keys(updatedFieldData).length > 0) {
                            const UpdatedFiled = await prisma.fields.update({
                                where: {id: field.id}, data: {
                                    ...updatedFieldData,
                                    farmerSawie_nr: farmer.sawie_nr,
                                    crop_id: field.crop_id,
                                    tehsil_id: field.tehsil_id,
                                    district_id: field.district_id,
                                    land_preparation: field.land_preparation,
                                    special_farm_processing_aability: field.special_farm_processing_aability,
                                    special_farm_storage_aability: field.special_farm_storage_aability,
                                    regen_farming: field.regen_farming
                                }
                            });
                            console.log('UpdatedFiled :', UpdatedFiled);
                        }
                    } else {
                        res.status(404).json({error: 'Field id not Found'});
                    }

                    // Check and update preparation_of_field
                    if (field.preparation_of_field) {
                        for (const preparation of field.preparation_of_field) {
                            var existingPreparation = [];

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
                                if (existingPreparationIndex.compvarion_date !== preparation.compvarion_date) updatedPreparationData.compvarion_date = preparation.compvarion_date;
                                if (existingPreparationIndex.activities !== preparation.activities) updatedPreparationData.activities = preparation.activities;
                                if (existingPreparationIndex.male_labour_hours !== preparation.male_labour_hours) updatedPreparationData.male_labour_hours = preparation.male_labour_hours;
                                if (existingPreparationIndex.female_labour_hours !== preparation.female_labour_hours) updatedPreparationData.female_labour_hours = preparation.female_labour_hours;

                                console.log('updatedPreparationData : ', updatedPreparationData)

                                if (Object.keys(updatedPreparationData).length > 0) {
                                    await prisma.preparationOfField.update({
                                        where: {id: preparation.id},
                                        data: {...updatedPreparationData, field_id: field.id},
                                    });
                                }
                            } else {
                                const FinalFieldID = existingField.id
                                const addedPrep = await prisma.preparationOfField.create({
                                    data: {
                                        ...preparation, field_id: FinalFieldID
                                    }
                                });
                                console.log('preparation created', addedPrep);

                            }
                        }
                    }

                    // Check and update Irrigation
                    if (field.Irrigation) {
                        for (const irrigation of field.Irrigation) {

                            var existingIrrigation = []
                            if (irrigation.id) {
                                var existingIrrigation2 = await prisma.irrigation.findMany({
                                    where: {
                                        id: irrigation.id
                                    }
                                });
                            }
                            console.log('existingIrrigation:', existingIrrigation2)

                            if (existingIrrigation2.length > 0) {
                                const updatedIrrigationData = {};
                                existingIrrigation = existingIrrigation2[0]
                                if (existingIrrigation.irrigation_date !== irrigation.irrigation_date) updatedIrrigationData.irrigation_date = irrigation.irrigation_date;
                                if (existingIrrigation.male_labour_hours !== irrigation.male_labour_hours) updatedIrrigationData.male_labour_hours = irrigation.male_labour_hours;
                                if (existingIrrigation.female_labour_hours !== irrigation.female_labour_hours) updatedIrrigationData.female_labour_hours = irrigation.female_labour_hours;
                                if (existingIrrigation.unit_m3 !== irrigation.unit_m3) updatedIrrigationData.unit_m3 = irrigation.unit_m3;
                                if (existingIrrigation.source_of_irrigation !== irrigation.source_of_irrigation) updatedIrrigationData.source_of_irrigation = irrigation.source_of_irrigation;
                                if (existingIrrigation.cost_acre !== irrigation.cost_acre) updatedIrrigationData.cost_acre = irrigation.cost_acre;

                                if (Object.keys(updatedIrrigationData).length > 0) {
                                    await prisma.irrigation.update({
                                        where: {id: irrigation.id}, data: {...updatedIrrigationData, field_id: field.id}
                                    });
                                }
                            } else {
                                const FinalFieldID = existingField.id

                                const addedIrrigation = await prisma.irrigation.create({
                                    data: {
                                        ...irrigation, field_id: FinalFieldID
                                    }
                                });
                                console.log('irrigation created', addedIrrigation);

                            }
                        }
                    }

                    // Check and update Weed
                    if (field.weed) {
                        for (const weed of field.weed) {
                            var existingWeed2 = []
                            if (weed.id) {
                                var existingWeed = await prisma.weedTreatment.findMany({
                                    where: {
                                        id: weed.id
                                    }
                                });
                            }
                            console.log('existingWeed:', existingWeed)

                            if (existingWeed) {
                                const updatedWeedData = {};
                                existingWeed2 = existingWeed[0]
                                if (existingWeed2.weed_date !== weed.weed_date) updatedWeedData.weed_date = weed.weed_date;
                                if (existingWeed2.activity !== weed.activity) updatedWeedData.activity = weed.activity;
                                if (existingWeed2.title_of_product !== weed.title_of_product) updatedWeedData.title_of_product = weed.title_of_product;
                                if (existingWeed2.quantity !== weed.quantity) updatedWeedData.quantity = weed.quantity;
                                if (existingWeed2.quantity_unit !== weed.quantity_unit) updatedWeedData.quantity_unit = weed.quantity_unit;
                                if (existingWeed2.male_labour_hours !== weed.male_labour_hours) updatedWeedData.male_labour_hours = weed.male_labour_hours;
                                if (existingWeed2.female_labour_hours !== weed.female_labour_hours) updatedWeedData.female_labour_hours = weed.female_labour_hours;
                                if (existingWeed2.cost_per_acer !== weed.cost_per_acer) updatedWeedData.cost_per_acer = weed.cost_per_acer;

                                if (Object.keys(updatedWeedData).length > 0) {
                                    await prisma.weedTreatment.update({
                                        where: {id: weed.id}, data: {...updatedWeedData, field_id: field.id}
                                    });
                                }
                            } else {
                                const FinalFieldID = existingField.id
                                const addedWeed = await prisma.weedTreatment.create({
                                    data: {
                                        ...weed, field_id: FinalFieldID
                                    }
                                });
                                console.log('addedWeed :', addedWeed)
                            }
                        }
                    }

                    // Check and update fertilizer
                    if (field.fertilizer) {
                        for (const fertilizer of field.fertilizer) {
                            var existingfertilizer = []
                            if (fertilizer.id) {
                                var existingfertilizer2 = await prisma.fertilizer.findMany({
                                    where: {
                                        id: fertilizer.id
                                    }
                                });
                            }
                            console.log('existingfertilizer:', existingfertilizer2)

                            if (existingfertilizer2) {
                                const updatedfertilizerData = {};
                                existingfertilizer = existingfertilizer2[0]
                                if (existingfertilizer.fertilizer_date !== fertilizer.fertilizer_date) updatedfertilizerData.fertilizer_date = fertilizer.fertilizer_date;
                                if (existingfertilizer.male_labour_hours !== fertilizer.male_labour_hours) updatedfertilizerData.male_labour_hours = fertilizer.male_labour_hours;
                                if (existingfertilizer.female_labour_hours !== fertilizer.female_labour_hours) updatedfertilizerData.female_labour_hours = fertilizer.female_labour_hours;
                                if (existingfertilizer.type_of_fertilizer !== fertilizer.type_of_fertilizer) updatedfertilizerData.type_of_fertilizer = fertilizer.type_of_fertilizer;
                                if (existingfertilizer.quantity !== fertilizer.quantity) updatedfertilizerData.quantity = fertilizer.quantity;
                                if (existingfertilizer.quantity_unit !== fertilizer.quantity_unit) updatedfertilizerData.quantity_unit = fertilizer.quantity_unit;
                                if (existingfertilizer.fertilizer_cost !== fertilizer.fertilizer_cost) updatedfertilizerData.fertilizer_cost = fertilizer.fertilizer_cost;
                                if (existingfertilizer.cost_per_acer !== fertilizer.cost_per_acer) updatedfertilizerData.cost_per_acer = fertilizer.cost_per_acer;

                                if (Object.keys(updatedfertilizerData).length > 0) {
                                    await prisma.fertilizer.update({
                                        where: {id: fertilizer.id}, data: {...updatedfertilizerData, field_id: field.id}
                                    });
                                }
                            } else {

                                const addedfertilizer = await prisma.fertilizer.create({
                                    data: {
                                        ...fertilizer, field_id: existingField ? existingField.id : addedField.id
                                    }
                                });
                                console.log('addedfertilizer:', addedfertilizer)
                            }
                        }
                    }

                    // Check and update IssueDetected
                    if (field.IssueDetected) {
                        for (const issue of field.IssueDetected) {

                            var existingIssue = []

                            if (issue.id) {
                                var existingIssue2 = await prisma.issueDetected.findMany({
                                    where: {
                                        id: issue.id
                                    }
                                });
                            }

                            console.log('existingIssue', existingIssue2)
                            if (existingIssue2) {
                                const updatedIssueData = {};
                                existingIssue = existingIssue2[0]
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
                                const addedfertilizer = await prisma.issueDetected.create({
                                    data: {
                                        ...issue, field_id: existingField ? existingField.id : addedField.id
                                    }
                                });
                                console.log('addedIssue :', addedfertilizer)
                            }
                        }
                    }

                    // Check and update disease_and_pest
                    if (field.disease_and_pest) {
                        for (const disease of field.disease_and_pest) {
                            var existingDisease = []
                            if (disease.id) {
                                var existingDisease2 = await prisma.diseaseAndPest.findMany({
                                    where: {
                                        id: disease.id
                                    }
                                });
                            }
                            console.log('existingDisease', existingDisease2)
                            if (existingDisease2) {
                                const updatedDiseaseData = {};
                                existingDisease = existingDisease2[0]
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
                                        ...disease, field_id: existingField ? existingField.id : addedField.id
                                    }
                                });
                                console.log('addedDisease :', addedDisease)
                            }
                        }
                    }

                    // Check and update harvesting
                    if (field.harvesting) {
                        for (const harvest of field.harvesting) {
                            var existingHarvest = []
                            if (harvest.id) {
                                var existingHarvest2 = await prisma.harvesting.findMany({
                                    where: {
                                        id: harvest.id
                                    }
                                });
                            }
                            console.log('existingHarvest', existingHarvest2)
                            if (existingHarvest2) {
                                const updatedHarvestData = {};
                                existingHarvest = existingHarvest2[0]
                                if (existingHarvest.est_date_of_harvesting !== harvest.est_date_of_harvesting) updatedHarvestData.est_date_of_harvesting = harvest.est_date_of_harvesting;
                                if (existingHarvest.date_of_compvarion !== harvest.date_of_compvarion) updatedHarvestData.date_of_compvarion = harvest.date_of_compvarion;
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
                                const addedharvesting = await prisma.harvesting.create({
                                    data: {
                                        ...harvest, field_id: existingField ? existingField.id : addedField.id
                                    }
                                });
                                console.log('addedharvesting :', addedharvesting)
                            }
                        }
                    }
                }
            }

            // Update supervisor
// Update or create Supervisor
            if (farmData.supervisor) {
                const updatedSupervisorData = {};
                if (farmer.supervisor.type !== farmData.supervisor.type) updatedSupervisorData.type = farmData.supervisor.type;
                if (farmer.supervisor.name !== farmData.supervisor.name) updatedSupervisorData.name = farmData.supervisor.name;
                if (farmer.supervisor.number !== farmData.supervisor.number) updatedSupervisorData.number = farmData.supervisor.number;
                if (farmer.supervisor.company !== farmData.supervisor.company) updatedSupervisorData.company = farmData.supervisor.company;
                console.log('updatedSupervisorData : ', updatedSupervisorData);

                if (Object.keys(updatedSupervisorData).length > 0) {
                    if (farmer.supervisor.id) {
                        console.log('Updating Supervisor with ID:', farmer.supervisor.id);
                        await prisma.supervisor.update({
                            where: {id: farmer.supervisor.id},
                            data: updatedSupervisorData
                        });
                    } else {
                        console.log('Creating new Supervisor');
                        await prisma.supervisor.create({data: updatedSupervisorData});
                    }
                }
            }


// Update or create Training
            if (farmData.training) {
                const updatedtrainingData = {};
                if (farmer.training.month !== farmData.training.month) updatedtrainingData.month = farmData.training.month;
                if (farmer.training.topic !== farmData.training.topic) updatedtrainingData.topic = farmData.training.topic;
                if (farmer.training.trainer_name !== farmData.training.trainer_name) updatedtrainingData.trainer_name = farmData.training.trainer_name;
                if (farmer.training.idea !== farmData.training.idea) updatedtrainingData.idea = farmData.training.idea;
                if (farmer.training.farmerSawie_nr !== farmData.training.farmerSawie_nr) updatedtrainingData.farmerSawie_nr = farmData.training.farmerSawie_nr;

                console.log('updatedtrainingData : ', updatedtrainingData);

                if (Object.keys(updatedtrainingData).length > 0) {
                    if (farmer.training.id) {
                        console.log('Updating Training with ID:', farmer.training.id);
                        await prisma.training.update({
                            where: {id: farmer.training.id},
                            data: updatedtrainingData
                        });
                    } else {
                        console.log('Creating new Training');
                        await prisma.training.create({data: updatedtrainingData});
                    }
                }
            }

// Update or create SolarTubeWell
            if (farmData.solar_tube_well && Object.keys(farmData.solar_tube_well).length > 0) {
                const updatedsolar_tube_wellData = {};
                if (farmer.solar_tube_well.activity_date !== farmData.solar_tube_well.activity_date) updatedsolar_tube_wellData.activity_date = farmData.solar_tube_well.activity_date;
                if (farmer.solar_tube_well.repairing_costs !== farmData.solar_tube_well.repairing_costs) updatedsolar_tube_wellData.repairing_costs = farmData.solar_tube_well.repairing_costs;
                if (farmer.solar_tube_well.manageing_hours !== farmData.solar_tube_well.manageing_hours) updatedsolar_tube_wellData.manageing_hours = farmData.solar_tube_well.manageing_hours;
                if (farmer.solar_tube_well.costs_per_hour !== farmData.solar_tube_well.costs_per_hour) updatedsolar_tube_wellData.costs_per_hour = farmData.solar_tube_well.costs_per_hour;

                console.log('updatedsolar_tube_wellData : ', updatedsolar_tube_wellData);

                if (Object.keys(updatedsolar_tube_wellData).length > 0) {
                    if (farmer.solar_tube_well.id) {
                        console.log('Updating SolarTubeWell with ID:', farmer.solar_tube_well.id);
                        await prisma.solarTubeWell.update({
                            where: {id: farmer.solar_tube_well.id},
                            data: updatedsolar_tube_wellData
                        });
                    } else {
                        console.log('Creating new SolarTubeWell');
                        await prisma.solarTubeWell.create({data: updatedsolar_tube_wellData});
                    }
                }
            }

            if (farmData.motor_tube_well && Object.keys(farmData.motor_tube_well).length > 0) {
                const updatedmotor_tube_wellData = {};
                if (farmer.motor_tube_well.activity_date !== farmData.motor_tube_well.activity_date) updatedmotor_tube_wellData.activity_date = farmData.motor_tube_well.activity_date;
                if (farmer.motor_tube_well.repairing_costs !== farmData.motor_tube_well.repairing_costs) updatedmotor_tube_wellData.repairing_costs = farmData.motor_tube_well.repairing_costs;
                if (farmer.motor_tube_well.manageing_hours !== farmData.motor_tube_well.manageing_hours) updatedmotor_tube_wellData.manageing_hours = farmData.motor_tube_well.manageing_hours;
                if (farmer.motor_tube_well.diesel_quantity !== farmData.motor_tube_well.diesel_quantity) updatedmotor_tube_wellData.diesel_quantity = farmData.motor_tube_well.diesel_quantity;
                if (farmer.motor_tube_well.costs_per_hour !== farmData.motor_tube_well.costs_per_hour) updatedmotor_tube_wellData.costs_per_hour = farmData.motor_tube_well.costs_per_hour;
                if (farmer.motor_tube_well.costs_per_liter !== farmData.motor_tube_well.costs_per_liter) updatedmotor_tube_wellData.costs_per_liter = farmData.motor_tube_well.costs_per_liter;

                console.log('updatedmotor_tube_wellData : ', updatedmotor_tube_wellData);

                if (Object.keys(updatedmotor_tube_wellData).length > 0) {
                    await prisma.motorTubeWell.update({
                        where: {id: farmer.motor_tube_well.id},
                        data: updatedmotor_tube_wellData
                    });
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

