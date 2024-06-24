const prisma = require("../src/prismaClient");
router.post('/', async (req, res) => {
    const farmerData = req.body;

    // Helper function to convert YYYYMMDD integer to ISO date string
    const toISODate = (yyyymmdd) => {
        return yyyymmdd
        // const dateStr = yyyymmdd.toString();
        // const year = parseInt(dateStr.slice(0, 4), 10);
        // const month = parseInt(dateStr.slice(4, 6), 10) - 1; // Months in JavaScript Date object are 0-indexed (0 = January)
        // const day = parseInt(dateStr.slice(6, 8), 10);
        //
        // const dateObj = new Date(year, month, day);
        // const unixTimestamp = Math.floor(dateObj.getTime() / 1000); // Convert milliseconds to seconds
        //
        // console.log('Unix Timestamp:', unixTimestamp);
        // console.log('Typeof Unix Timestamp:', typeof unixTimestamp);
        //
        // return unixTimestamp.toString();
    };


    // Convert date fields in the Fields array
    farmerData.Fields = farmerData.Fields.map(field => {
        // Convert dates in preparation_of_field array
        if (field.preparation_of_field) {
            field.preparation_of_field = field.preparation_of_field.map(prep => {
                return {
                    ...prep,
                    completion_date: toISODate(prep.completion_date)
                };
            });
        }

        // Convert dates in Irrigation array
        if (field.Irrigation) {
            field.Irrigation = field.Irrigation.map(irrigation => {
                return {
                    ...irrigation,
                    irrigation_date: toISODate(irrigation.irrigation_date)
                };
            });
        }

        // Convert dates in weed array
        if (field.weed) {
            field.weed = field.weed.map(weed => {
                return {
                    ...weed,
                    weed_date: toISODate(weed.weed_date)
                };
            });
        }

        // Convert dates in fertilizer array
        if (field.fertilizer) {
            field.fertilizer = field.fertilizer.map(fertilizer => {
                return {
                    ...fertilizer,
                    fertilizer_date: toISODate(fertilizer.fertilizer_date)
                };
            });
        }

        // Convert dates in IssueDetected array
        if (field.IssueDetected) {
            field.IssueDetected = field.IssueDetected.map(issue => {
                return {
                    ...issue,
                    issue_date: toISODate(issue.issue_date)
                };
            });
        }

        // Convert dates in disease_and_pest array
        if (field.disease_and_pest) {
            field.disease_and_pest = field.disease_and_pest.map(disease => {
                return {
                    ...disease,
                    disease_date: toISODate(disease.disease_date)
                };
            });
        }

        // Convert dates in harvesting array
        if (field.harvesting) {
            field.harvesting = field.harvesting.map(harvest => {
                return {
                    ...harvest,
                    est_date_of_harvesting: toISODate(harvest.est_date_of_harvesting),
                    date_of_completion: toISODate(harvest.date_of_completion)
                };
            });
        }

        return field;
    });

    try {
        const existingFarmer = await prisma.farmer.findUnique({
            where: {sawie_nr: farmerData.sawie_nr},
            include: {Fields: true, farmer_crop: true}
        });

        if (existingFarmer) {
            const {sawie_nr, farmer_contact_person_id, super_visor_id, ...updateData} = farmerData;

            const updatedFarmer = await prisma.farmer.update({
                where: {sawie_nr},
                data: {
                    ...updateData,
                    FarmerContactPerson: farmer_contact_person_id ? {
                        connect: {id: farmer_contact_person_id}
                    } : undefined,
                    supervisor: super_visor_id ? {
                        connect: {id: super_visor_id}
                    } : undefined,
                    training: farmerData.training ? {
                        update: {
                            month: farmerData.training.month,
                            topic: farmerData.training.topic,
                            trainer_name: farmerData.training.trainer_name,
                            idea: farmerData.training.idea,
                        }
                    } : undefined,
                    Fields: {
                        upsert: farmerData.Fields.map(field => ({
                            where: {id: field.id || 0},
                            update: {
                                regen_farming: field.regen_farming,
                                special_farm_storage_aability: field.special_farm_storage_aability,
                                special_farm_processing_aability: field.special_farm_processing_aability,
                                land_preparation: field.land_preparation,
                                field_address: field.field_address,
                                organic_acres_farmed_again: field.organic_acres_farmed_again,
                                area_changed_into_organic: field.area_changed_into_organic,
                                traditional_farmed_cotton_area: field.traditional_farmed_cotton_area,
                                other_farmed_area: field.other_farmed_area,
                                production_forecast: field.production_forecast,
                                ownership: field.ownership,
                                rain_water: field.rain_water,
                                michung: field.michung,
                                green_fertilizer: field.green_fertilizer,
                                trap_crop: field.trap_crop,
                                border_crop: field.border_crop,
                                trees_at_edge: field.trees_at_edge,
                                bio_gas_plant: field.bio_gas_plant,
                                conversion_of_organisms: field.conversion_of_organisms,
                                inter_crop: field.inter_crop,
                                clear_election: field.clear_election,
                                method_of_irrigation: field.method_of_irrigation,
                                mapped_digitalized: field.mapped_digitalized,
                                preparation_of_field: {
                                    upsert: field.preparation_of_field.map(preparation => ({
                                        where: {id: preparation.id || 0},
                                        update: {
                                            levelalized: preparation.levelalized,
                                            completion_date: preparation.completion_date, // Use the ISO date string
                                            activities: preparation.activities,
                                            male_labour_hours: preparation.male_labour_hours,
                                            female_labour_hours: preparation.female_labour_hours
                                        },
                                        create: {
                                            levelalized: preparation.levelalized,
                                            completion_date: preparation.completion_date, // Use the ISO date string
                                            activities: preparation.activities,
                                            male_labour_hours: preparation.male_labour_hours,
                                            female_labour_hours: preparation.female_labour_hours
                                        }
                                    }))
                                },
                                Irrigation: {
                                    upsert: field.Irrigation.map(irrigation => ({
                                        where: {id: irrigation.id || 0},
                                        update: {
                                            irrigation_date: irrigation.irrigation_date, // Use the ISO date string
                                            male_labour_hours: irrigation.male_labour_hours,
                                            female_labour_hours: irrigation.female_labour_hours,
                                            unit_m3: irrigation.unit_m3,
                                            source_of_irrigation: irrigation.source_of_irrigation,
                                            cost_acre: irrigation.cost_acre
                                        },
                                        create: {
                                            irrigation_date: irrigation.irrigation_date, // Use the ISO date string
                                            male_labour_hours: irrigation.male_labour_hours,
                                            female_labour_hours: irrigation.female_labour_hours,
                                            unit_m3: irrigation.unit_m3,
                                            source_of_irrigation: irrigation.source_of_irrigation,
                                            cost_acre: irrigation.cost_acre
                                        }
                                    }))
                                },
                                weed: {
                                    upsert: field.weed.map(weed => ({
                                        where: {id: weed.id || 0},
                                        update: {
                                            weed_date: weed.weed_date, // Use the ISO date string
                                            activity: weed.activity,
                                            title_of_product: weed.title_of_product,
                                            quantity: weed.quantity,
                                            quantity_unit: weed.quantity_unit,
                                            male_labour_hours: weed.male_labour_hours,
                                            female_labour_hours: weed.female_labour_hours,
                                            cost_per_acer: weed.cost_per_acer
                                        },
                                        create: {
                                            weed_date: weed.weed_date, // Use the ISO date string
                                            activity: weed.activity,
                                            title_of_product: weed.title_of_product,
                                            quantity: weed.quantity,
                                            quantity_unit: weed.quantity_unit,
                                            male_labour_hours: weed.male_labour_hours,
                                            female_labour_hours: weed.female_labour_hours,
                                            cost_per_acer: weed.cost_per_acer
                                        }
                                    }))
                                },
                                fertilizer: {
                                    upsert: field.fertilizer.map(fertilizer => ({
                                        where: {id: fertilizer.id || 0},
                                        update: {
                                            fertilizer_date: fertilizer.fertilizer_date, // Use the ISO date string
                                            male_labour_hours: fertilizer.male_labour_hours,
                                            female_labour_hours: fertilizer.female_labour_hours,
                                            type_of_fertilizer: fertilizer.type_of_fertilizer,
                                            quantity: fertilizer.quantity,
                                            quantity_unit: fertilizer.quantity_unit,
                                            fertilizer_cost: fertilizer.fertilizer_cost,
                                            cost_per_acer: fertilizer.cost_per_acer
                                        },
                                        create: {
                                            fertilizer_date: fertilizer.fertilizer_date, // Use the ISO date string
                                            male_labour_hours: fertilizer.male_labour_hours,
                                            female_labour_hours: fertilizer.female_labour_hours,
                                            type_of_fertilizer: fertilizer.type_of_fertilizer,
                                            quantity: fertilizer.quantity,
                                            quantity_unit: fertilizer.quantity_unit,
                                            fertilizer_cost: fertilizer.fertilizer_cost,
                                            cost_per_acer: fertilizer.cost_per_acer
                                        }
                                    }))
                                },
                                IssueDetected: {
                                    upsert: field.IssueDetected.map(issue => ({
                                        where: {id: issue.id || 0},
                                        update: {
                                            issue_date: issue.issue_date, // Use the ISO date string
                                            issue_name: issue.issue_name,
                                            issue_calssification: issue. issue_calssification,
                                            male_labour_hours: issue.male_labour_hours,
                                            female_labour_hours: issue.female_labour_hours,
                                            issue_cost: issue.issue_cost,
                                            cost_per_acer: issue.cost_per_acer
                                        },
                                        create: {
                                            issue_date: issue.issue_date, // Use the ISO date string
                                            issue_name: issue.issue_name,
                                            issue_calssification: issue. issue_calssification,
                                            male_labour_hours: issue.male_labour_hours,
                                            female_labour_hours: issue.female_labour_hours,
                                            issue_cost: issue.issue_cost,
                                            cost_per_acer: issue.cost_per_acer
                                        }
                                    }))
                                },
                                disease_and_pest: {
                                    upsert: field.disease_and_pest.map(disease => ({
                                        where: {id: disease.id || 0},
                                        update: {
                                            disease_date: disease.disease_date, // Use the ISO date string
                                            cost: disease.cost,
                                            product: disease.product,
                                            male_labour_hours: disease.male_labour_hours,
                                            female_labour_hours: disease.female_labour_hours,
                                            quantity: disease.quantity,
                                            quantity_unit: disease.quantity_unit,
                                            cost_per_acer: disease.cost_per_acer
                                        },
                                        create: {
                                            disease_date: disease.disease_date, // Use the ISO date string
                                            cost: disease.cost,
                                            product: disease.product,
                                            male_labour_hours: disease.male_labour_hours,
                                            female_labour_hours: disease.female_labour_hours,
                                            quantity: disease.quantity,
                                            quantity_unit: disease.quantity_unit,
                                            cost_per_acer: disease.cost_per_acer
                                        }
                                    }))
                                },
                                harvesting: {
                                    upsert: field.harvesting.map(harvest => ({
                                        where: {id: harvest.id || 0},
                                        update: {
                                            est_date_of_harvesting: harvest.est_date_of_harvesting, // Use the ISO date string
                                            date_of_completion: harvest.date_of_completion, // Use the ISO date string
                                            est_yield: harvest.est_yield,
                                            harvested_yield: harvest.harvested_yield,
                                            male_labour_hours: harvest.male_labour_hours,
                                            female_labour_hours: harvest.female_labour_hours,
                                            mechanisation: harvest.mechanisation,
                                            cost_per_acer: harvest.cost_per_acer,
                                            total_cost: harvest.total_cost
                                        },
                                        create: {
                                            est_date_of_harvesting: harvest.est_date_of_harvesting, // Use the ISO date string
                                            date_of_completion: harvest.date_of_completion, // Use the ISO date string
                                            est_yield: harvest.est_yield,
                                            harvested_yield: harvest.harvested_yield,
                                            male_labour_hours: harvest.male_labour_hours,
                                            female_labour_hours: harvest.female_labour_hours,
                                            mechanisation: harvest.mechanisation,
                                            cost_per_acer: harvest.cost_per_acer,
                                            total_cost: harvest.total_cost
                                        }
                                    }))
                                },
                                crop: {
                                    connect: {id: field.crop_id}
                                },
                                tehsil: {
                                    connect: {id: field.tehsil_id}
                                },
                                state: {
                                    connect: {id: field.state_id}
                                },
                                district: {
                                    connect: {id: field.district_id}
                                }
                            },
                            create: {
                                regen_farming: field.regen_farming,
                                special_farm_storage_aability: field.special_farm_storage_aability,
                                special_farm_processing_aability: field.special_farm_processing_aability,
                                land_preparation: field.land_preparation,
                                field_address: field.field_address,
                                organic_acres_farmed_again: field.organic_acres_farmed_again,
                                area_changed_into_organic: field.area_changed_into_organic,
                                traditional_farmed_cotton_area: field.traditional_farmed_cotton_area,
                                other_farmed_area: field.other_farmed_area,
                                production_forecast: field.production_forecast,
                                ownership: field.ownership,
                                rain_water: field.rain_water,
                                michung: field.michung,
                                green_fertilizer: field.green_fertilizer,
                                trap_crop: field.trap_crop,
                                border_crop: field.border_crop,
                                trees_at_edge: field.trees_at_edge,
                                bio_gas_plant: field.bio_gas_plant,
                                conversion_of_organisms: field.conversion_of_organisms,
                                inter_crop: field.inter_crop,
                                clear_election: field.clear_election,
                                method_of_irrigation: field.method_of_irrigation,
                                mapped_digitalized: field.mapped_digitalized,
                                preparation_of_field: {
                                    create: field.preparation_of_field.map(preparation => ({
                                        levelalized: preparation.levelalized,
                                        completion_date: preparation.completion_date, // Use the ISO date string
                                        activities: preparation.activities,
                                        male_labour_hours: preparation.male_labour_hours,
                                        female_labour_hours: preparation.female_labour_hours
                                    }))
                                },
                                Irrigation: {
                                    create: field.Irrigation.map(irrigation => ({
                                        irrigation_date: irrigation.irrigation_date, // Use the ISO date string
                                        male_labour_hours: irrigation.male_labour_hours,
                                        female_labour_hours: irrigation.female_labour_hours,
                                        unit_m3: irrigation.unit_m3,
                                        source_of_irrigation: irrigation.source_of_irrigation,
                                        cost_acre: irrigation.cost_acre
                                    }))
                                },
                                weed: {
                                    create: field.weed.map(weed => ({
                                        weed_date: weed.weed_date, // Use the ISO date string
                                        activity: weed.activity,
                                        title_of_product: weed.title_of_product,
                                        quantity: weed.quantity,
                                        quantity_unit: weed.quantity_unit,
                                        male_labour_hours: weed.male_labour_hours,
                                        female_labour_hours: weed.female_labour_hours,
                                        cost_per_acer: weed.cost_per_acer
                                    }))
                                },
                                fertilizer: {
                                    create: field.fertilizer.map(fertilizer => ({
                                        fertilizer_date: fertilizer.fertilizer_date, // Use the ISO date string
                                        male_labour_hours: fertilizer.male_labour_hours,
                                        female_labour_hours: fertilizer.female_labour_hours,
                                        type_of_fertilizer: fertilizer.type_of_fertilizer,
                                        quantity: fertilizer.quantity,
                                        quantity_unit: fertilizer.quantity_unit,
                                        fertilizer_cost: fertilizer.fertilizer_cost,
                                        cost_per_acer: fertilizer.cost_per_acer
                                    }))
                                },
                                IssueDetected: {
                                    create: field.IssueDetected.map(issue => ({
                                        issue_date: issue.issue_date, // Use the ISO date string
                                        issue_name: issue.issue_name,
                                        issue_calssification: issue. issue_calssification,
                                        male_labour_hours: issue.male_labour_hours,
                                        female_labour_hours: issue.female_labour_hours,
                                        issue_cost: issue.issue_cost,
                                        cost_per_acer: issue.cost_per_acer
                                    }))
                                },
                                disease_and_pest: {
                                    create: field.disease_and_pest.map(disease => ({
                                        disease_date: disease.disease_date, // Use the ISO date string
                                        cost: disease.cost,
                                        product: disease.product,
                                        male_labour_hours: disease.male_labour_hours,
                                        female_labour_hours: disease.female_labour_hours,
                                        quantity: disease.quantity,
                                        quantity_unit: disease.quantity_unit,
                                        cost_per_acer: disease.cost_per_acer
                                    }))
                                },
                                harvesting: {
                                    create: field.harvesting.map(harvest => ({
                                        est_date_of_harvesting: harvest.est_date_of_harvesting, // Use the ISO date string
                                        date_of_completion: harvest.date_of_completion, // Use the ISO date string
                                        est_yield: harvest.est_yield,
                                        harvested_yield: harvest.harvested_yield,
                                        male_labour_hours: harvest.male_labour_hours,
                                        female_labour_hours: harvest.female_labour_hours,
                                        mechanisation: harvest.mechanisation,
                                        cost_per_acer: harvest.cost_per_acer,
                                        total_cost: harvest.total_cost
                                    }))
                                },
                                crop: {
                                    connect: {id: field.crop_id}
                                },
                                tehsil: {
                                    connect: {id: field.tehsil_id}
                                },
                                state: {
                                    connect: {id: field.state_id}
                                },
                                district: {
                                    connect: {id: field.district_id}
                                }
                            }
                        }))
                    },
                    farmer_crop: {
                        upsert: farmerData.farmer_crop.map(crop => ({
                            where: {id: crop.id || 0},
                            update: {
                                date_of_purchasing: new Date(crop.date_of_purchasing).toISOString(),
                                source: crop.source,
                                total_quantity: crop.total_quantity,
                                total_price: crop.total_price,
                                price_per_kg: crop.price_per_kg,
                                crop: {
                                    connect: {id: crop.crop_id}
                                },
                                crop_variety: {
                                    connect: {id: crop.crop_variety_id}
                                }
                            },
                            create: {
                                date_of_purchasing: new Date(crop.date_of_purchasing).toISOString(),
                                source: crop.source,
                                total_quantity: crop.total_quantity,
                                total_price: crop.total_price,
                                price_per_kg: crop.price_per_kg,
                                crop: {
                                    connect: {id: crop.crop_id}
                                },
                                crop_variety: {
                                    connect: {id: crop.crop_variety_id}
                                }
                            }
                        }))
                    },
                    solar_tube_well: farmerData.solar_tube_well ? {
                        upsert: {
                            where: {farmerSawie_nr: farmerData.sawie_nr},
                            update: {...farmerData.solar_tube_well},
                            create: {...farmerData.solar_tube_well}
                        }
                    } : undefined,
                    motor_tube_well: farmerData.motor_tube_well ? {
                        upsert: {
                            where: {farmerSawie_nr: farmerData.sawie_nr},
                            update: {...farmerData.motor_tube_well},
                            create: {...farmerData.motor_tube_well}
                        }
                    } : undefined,
                    supervisor: farmerData.supervisor ? {
                        connectOrCreate: {
                            where: {id: farmerData.supervisor.id || 0},
                            create: farmerData.supervisor
                        }
                    } : undefined,
                    FarmerContactPerson: farmerData.FarmerContactPerson ? {
                        connectOrCreate: {
                            where: {id: farmerData.FarmerContactPerson.id || 0},
                            create: farmerData.FarmerContactPerson
                        }
                    } : undefined
                }
            });
            res.json(updatedFarmer);
        } else {
            const newFarmer = await prisma.farmer.create({
                data: {
                    ...farmerData,
                    FarmerContactPerson: farmer_contact_person_id ? {
                        connect: {id: farmer_contact_person_id}
                    } : undefined,
                    supervisor: super_visor_id ? {
                        connect: {id: super_visor_id}
                    } : undefined,
                    training: farmerData.training ? {
                        create: {
                            month: farmerData.training.month,
                            topic: farmerData.training.topic,
                            trainer_name: farmerData.training.trainer_name,
                            idea: farmerData.training.idea,
                        }
                    } : undefined,
                    Fields: {
                        create: farmerData.Fields.map(field => ({
                            regen_farming: field.regen_farming,
                            special_farm_storage_aability: field.special_farm_storage_aability,
                            special_farm_processing_aability: field.special_farm_processing_aability,
                            land_preparation: field.land_preparation,
                            field_address: field.field_address,
                            organic_acres_farmed_again: field.organic_acres_farmed_again,
                            area_changed_into_organic: field.area_changed_into_organic,
                            traditional_farmed_cotton_area: field.traditional_farmed_cotton_area,
                            other_farmed_area: field.other_farmed_area,
                            production_forecast: field.production_forecast,
                            ownership: field.ownership,
                            rain_water: field.rain_water,
                            michung: field.michung,
                            green_fertilizer: field.green_fertilizer,
                            trap_crop: field.trap_crop,
                            border_crop: field.border_crop,
                            trees_at_edge: field.trees_at_edge,
                            bio_gas_plant: field.bio_gas_plant,
                            conversion_of_organisms: field.conversion_of_organisms,
                            inter_crop: field.inter_crop,
                            clear_election: field.clear_election,
                            method_of_irrigation: field.method_of_irrigation,
                            mapped_digitalized: field.mapped_digitalized,
                            preparation_of_field: {
                                create: field.preparation_of_field.map(preparation => ({
                                    levelalized: preparation.levelalized,
                                    completion_date: preparation.completion_date, // Use the ISO date string
                                    activities: preparation.activities,
                                    male_labour_hours: preparation.male_labour_hours,
                                    female_labour_hours: preparation.female_labour_hours
                                }))
                            },
                            Irrigation: {
                                create: field.Irrigation.map(irrigation => ({
                                    irrigation_date: irrigation.irrigation_date, // Use the ISO date string
                                    male_labour_hours: irrigation.male_labour_hours,
                                    female_labour_hours: irrigation.female_labour_hours,
                                    unit_m3: irrigation.unit_m3,
                                    source_of_irrigation: irrigation.source_of_irrigation,
                                    cost_acre: irrigation.cost_acre
                                }))
                            },
                            weed: {
                                create: field.weed.map(weed => ({
                                    weed_date: weed.weed_date, // Use the ISO date string
                                    activity: weed.activity,
                                    title_of_product: weed.title_of_product,
                                    quantity: weed.quantity,
                                    quantity_unit: weed.quantity_unit,
                                    male_labour_hours: weed.male_labour_hours,
                                    female_labour_hours: weed.female_labour_hours,
                                    cost_per_acer: weed.cost_per_acer
                                }))
                            },
                            fertilizer: {
                                create: field.fertilizer.map(fertilizer => ({
                                    fertilizer_date: fertilizer.fertilizer_date, // Use the ISO date string
                                    male_labour_hours: fertilizer.male_labour_hours,
                                    female_labour_hours: fertilizer.female_labour_hours,
                                    type_of_fertilizer: fertilizer.type_of_fertilizer,
                                    quantity: fertilizer.quantity,
                                    quantity_unit: fertilizer.quantity_unit,
                                    fertilizer_cost: fertilizer.fertilizer_cost,
                                    cost_per_acer: fertilizer.cost_per_acer
                                }))
                            },
                            IssueDetected: {
                                create: field.IssueDetected.map(issue => ({
                                    issue_date: issue.issue_date, // Use the ISO date string
                                    issue_name: issue.issue_name,
                                    issue_calssification: issue. issue_calssification,
                                    male_labour_hours: issue.male_labour_hours,
                                    female_labour_hours: issue.female_labour_hours,
                                    issue_cost: issue.issue_cost,
                                    cost_per_acer: issue.cost_per_acer
                                }))
                            },
                            disease_and_pest: {
                                create: field.disease_and_pest.map(disease => ({
                                    disease_date: disease.disease_date, // Use the ISO date string
                                    cost: disease.cost,
                                    product: disease.product,
                                    male_labour_hours: disease.male_labour_hours,
                                    female_labour_hours: disease.female_labour_hours,
                                    quantity: disease.quantity,
                                    quantity_unit: disease.quantity_unit,
                                    cost_per_acer: disease.cost_per_acer
                                }))
                            },
                            harvesting: {
                                create: field.harvesting.map(harvest => ({
                                    est_date_of_harvesting: harvest.est_date_of_harvesting, // Use the ISO date string
                                    date_of_completion: harvest.date_of_completion, // Use the ISO date string
                                    est_yield: harvest.est_yield,
                                    harvested_yield: harvest.harvested_yield,
                                    male_labour_hours: harvest.male_labour_hours,
                                    female_labour_hours: harvest.female_labour_hours,
                                    mechanisation: harvest.mechanisation,
                                    cost_per_acer: harvest.cost_per_acer,
                                    total_cost: harvest.total_cost
                                }))
                            },
                            crop: {
                                connect: {id: field.crop_id}
                            },
                            tehsil: {
                                connect: {id: field.tehsil_id}
                            },
                            state: {
                                connect: {id: field.state_id}
                            },
                            district: {
                                connect: {id: field.district_id}
                            }
                        }))
                    },
                    farmer_crop: {
                        create: farmerData.farmer_crop.map(crop => ({
                            date_of_purchasing: new Date(crop.date_of_purchasing).toISOString(),
                            source: crop.source,
                            total_quantity: crop.total_quantity,
                            total_price: crop.total_price,
                            price_per_kg: crop.price_per_kg,
                            crop: {
                                connect: {id: crop.crop_id}
                            },
                            crop_variety: {
                                connect: {id: crop.crop_variety_id}
                            }
                        }))
                    },
                    solar_tube_well: farmerData.solar_tube_well ? {
                        create: {
                            ...farmerData.solar_tube_well
                        }
                    } : undefined,
                    motor_tube_well: farmerData.motor_tube_well ? {
                        create: {
                            ...farmerData.motor_tube_well
                        }
                    } : undefined,
                    supervisor: farmerData.supervisor ? {
                        connectOrCreate: {
                            where: {id: farmerData.supervisor.id || 0},
                            create: farmerData.supervisor
                        }
                    } : undefined,
                    FarmerContactPerson: farmerData.FarmerContactPerson ? {
                        connectOrCreate: {
                            where: {id: farmerData.FarmerContactPerson.id || 0},
                            create: farmerData.FarmerContactPerson
                        }
                    } : undefined
                }
            });
            res.json(newFarmer);
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});