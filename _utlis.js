function calculateCostsByCategory(dataArray) {
	let totalIrrigationCost = 0;
	let totalWeedManagementCost = 0;
	let totalFertilizerCost = 0;
	let totalIssueDetectedCost = 0;
	let totalDiseaseAndPestCost = 0;
	let totalHarvestingCost = 0;
	let totalMaleLaborCost = 0;
	let totalFemaleLaborCost = 0;
	
	dataArray.forEach(data => {
		// Extract labor rates from the farmer object
		const maleLaborRate = data.Farmer.labour_costs_male
		const femaleLaborRate = data.Farmer.labour_costs_female
		
		// Calculate costs for each category
		if (data.Irrigation) {
			data.Irrigation.forEach(item => {
				totalIrrigationCost += item.cost_acre;
				totalMaleLaborCost += item.male_labour_hours * maleLaborRate;
				totalFemaleLaborCost += item.female_labour_hours * femaleLaborRate;
			});
		}
		
		if (data.weed) {
			data.weed.forEach(item => {
				totalWeedManagementCost += item.cost_per_acer;
				totalMaleLaborCost += item.male_labour_hours * maleLaborRate;
				totalFemaleLaborCost += item.female_labour_hours * femaleLaborRate;
			});
		}
		
		if (data.fertilizer) {
			data.fertilizer.forEach(item => {
				totalFertilizerCost += item.fertilizer_cost;
				totalMaleLaborCost += item.male_labour_hours * maleLaborRate;
				totalFemaleLaborCost += item.female_labour_hours * femaleLaborRate;
			});
		}
		
		if (data.IssueDetected) {
			data.IssueDetected.forEach(item => {
				totalIssueDetectedCost += item.issue_cost;
				totalMaleLaborCost += item.male_labour_hours * maleLaborRate;
				totalFemaleLaborCost += item.female_labour_hours * femaleLaborRate;
			});
		}
		
		if (data.disease_and_pest) {
			data.disease_and_pest.forEach(item => {
				totalDiseaseAndPestCost += item.cost;
				totalMaleLaborCost += item.male_labour_hours * maleLaborRate;
				totalFemaleLaborCost += item.female_labour_hours * femaleLaborRate;
			});
		}
		
		if (data.harvesting) {
			data.harvesting.forEach(item => {
				totalHarvestingCost += item.total_cost;
				totalMaleLaborCost += item.male_labour_hours * maleLaborRate;
				totalFemaleLaborCost += item.female_labour_hours * femaleLaborRate;
			});
		}
	});
	
	return {
		totalIrrigationCost,
		totalWeedManagementCost,
		totalFertilizerCost,
		totalIssueDetectedCost,
		totalDiseaseAndPestCost,
		totalHarvestingCost,
		totalMaleLaborCost,
		totalFemaleLaborCost
	};
}

// Example usage
module.exports = {
	calculateCostsByCategory
};
