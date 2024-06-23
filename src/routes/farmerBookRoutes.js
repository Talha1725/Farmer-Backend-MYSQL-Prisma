// src/routes/farmerBookRoutes.js

const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const farmers = await prisma.farmer.findMany({
            include: {
                training: true,
                farmer_crop: {
                    include: {
                        crop: true,
                        crop_variety: true
                    }
                },
                solar_tube_well: true,
                motor_tube_well: true,
                Fields: {
                    include: {
                        preparation_of_field: true,
                        Irrigation: true,
                        weed: true,
                        fertilizer: true,
                        IssueDetected: true,
                        disease_and_pest: true,
                        harvesting: true,
                        crop: true,
                        tehsil: true,
                        state: true,
                        district: true,
                    }
                },
                supervisor: true,
                FarmerContactPerson: true
            }
        });
        res.json(farmers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;





// mock response :

/*Response for FarmerBook :


[
  {
    "sawie_nr": 123,
    "name": "John Doe",
    "father_name": "Richard Roe",
    "phone": "1234567890",
    "state": "StateName",
    "tehsil": "TehsilName",
    "district": "DistrictName",
    "farmer_address": "123 Farmer Street",
    "farmer_contact_person_id": 10,
    "super_visor_id": 5,
    "labour_costs_male": "50",
    "labour_costs_female": "40",
    "training": {
      "id": 1,
      "month": "January",
      "topic": "Organic Farming",
      "trainer_name": "Jane Smith",
      "idea": "Implementing sustainable practices",
      "farmerSawie_nr": 123
    },
    "farmer_crop": [
      {
        "id": 1,
        "farmerSawie_nr": 123,
        "crop_id": 5,
        "crop_variety_id": 2,
        "date_of_purchasing": "2023-01-01T00:00:00.000Z",
        "source": "by_myself",
        "total_quantity": 100,
        "total_price": 1000,
        "price_per_kg": 10,
        "crop": {
          "id": 5,
          "crop_name": "Cotton"
        },
        "crop_variety": {
          "id": 2,
          "variety_name": "High Yield"
        }
      }
    ],
    "solar_tube_well": {
      "id": 1,
      "farmerSawie_nr": 123,
      "activity_date": "2023-01-01T00:00:00.000Z",
      "repairing_costs": 500,
      "manageing_hours": 20,
      "costs_per_hour": 25
    },
    "motor_tube_well": {
      "id": 1,
      "farmerSawie_nr": 123,
      "activity_date": "2023-01-01T00:00:00.000Z",
      "repairing_costs": 300,
      "manageing_hours": 15,
      "diesel_quantity": 100,
      "costs_per_hour": 30,
      "costs_per_liter": 1
    },
    "Fields": [
      {
        "id": 1,
        "farmerSawie_nr": 123,
        "regen_farming": "registered",
        "special_farm_storage_aability": "temp_warehouse",
        "special_farm_processing_aability": "Drying",
        "land_preparation": "Plowed",
        "field_address": "123 Farm Lane",
        "organic_acres_farmed_again": 5,
        "area_changed_into_organic": 2,
        "traditional_farmed_cotton_area": 3,
        "other_farmed_area": 1,
        "production_forecast": 1000,
        "ownership": "self_owned",
        "rain_water": "Yes",
        "michung": "Yes",
        "green_fertilizer": "Yes",
        "trap_crop": "No",
        "border_crop": "Yes",
        "trees_at_edge": "Yes",
        "bio_gas_plant": "Yes",
        "conversion_of_organisms": "Yes",
        "inter_crop": "No",
        "clear_election": "Yes",
        "method_of_irrigation": "Drip",
        "mapped_digitalized": "Yes",
        "preparation_of_field_id": 10,
        "crop_id": 5,
        "tehsil_id": 2,
        "state_id": 1,
        "district_id": 1,
        "country_id": 1,
        "preparation_of_field": [
          {
            "id": 10,
            "levelalized": true,
            "completion_date": "2023-01-01T00:00:00.000Z",
            "activities": "mechanical",
            "male_labour_hours": 10,
            "female_labour_hours": 5,
            "field_id": 1
          }
        ],
        "Irrigation": [
          {
            "id": 20,
            "irrigation_date": "2023-02-01T00:00:00.000Z",
            "male_labour_hours": 8,
            "female_labour_hours": 6,
            "unit_m3": 100,
            "source_of_irrigation": "canal",
            "cost_acre": 200,
            "field_id": 1
          }
        ],
        "weed": [
          {
            "id": 30,
            "weed_date": 20230101,
            "activity": "Weeding",
            "title_of_product": "WeedEx",
            "quantity": 10,
            "quantity_unit": "kg",
            "male_labour_hours": 4,
            "female_labour_hours": 3,
            "cost_per_acer": 50,
            "field_id": 1
          }
        ],
        "fertilizer": [
          {
            "id": 40,
            "fertilizer_date": 20230115,
            "male_labour_hours": 5,
            "female_labour_hours": 2,
            "type_of_fertilizer": "Organic",
            "quantity": 20,
            "quantity_unit": "kg",
            "fertilizer_cost": 300,
            "cost_per_acer": 70,
            "field_id": 1
          }
        ],
        "IssueDetected": [
          {
            "id": 50,
            "issue_date": 20230120,
            "issue_name": "Soil Erosion",
            "issue_calssification": "soil",
            "male_labour_hours": 2,
            "female_labour_hours": 1,
            "issue_cost": 100,
            "cost_per_acer": 20,
            "field_id": 1
          }
        ],
        "disease_and_pest": [
          {
            "id": 60,
            "disease_date": 20230201,
            "cost": 150,
            "product": "Product1",
            "male_labour_hours": 3,
            "female_labour_hours": 2,
            "quantity": 5,
            "quantity_unit": "kg",
            "cost_per_acer": 30,
            "field_id": 1
          }
        ],
        "harvesting": [
          {
            "id": 70,
            "est_date_of_harvesting": "2023-03-01T00:00:00.000Z",
            "date_of_completion": "2023-03-15T00:00:00.000Z",
            "est_yield": 1000,
            "harvested_yield": 900,
            "male_labour_hours": 10,
            "female_labour_hours": 7,
            "mechanisation": "machines",
            "cost_per_acer": 200,
            "total_cost": 1800,
            "field_id": 1
          }
        ],
        "crop": {
          "id": 5,
          "crop_name": "Cotton"
        },
        "tehsil": {
          "id": 2,
          "name": "TehsilName",
          "district_id": 1,
          "state_id": 1,
          "country_id": 1,
          "salinity_exposure": 10,
          "salinity_exposure_max": 20,
          "arsenic_exposure": 5,
          "arsenic_exposure_max": 10,
          "water_level": 15,
          "water_level_max": 25,
          "tehsil_coordinates": "Coordinates"
        },
        "state": {
          "id": 1,
          "name": "StateName",
          "country_id": 1
        },
        "district": {
          "id": 1,
          "name": "DistrictName",
          "state_id": 1,
          "country_id": 1
        }
      }
    ],
    "supervisor": {
      "id": 5,
      "type": "field_trainer",
      "name": "Mike Supervisor",
      "number": "0987654321",
      "company": "AgriCorp"
    },
    "FarmerContactPerson": {
      "id": 10,
      "name": "Jane Contact",
      "number": "1122334455"
    }
  }
]*/