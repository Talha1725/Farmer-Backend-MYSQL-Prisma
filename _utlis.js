function calculateCostsByCategory(dataArray) {
	let totalIrrigationCost = 0, totalWeedManagementCost = 0, totalFertilizerCost = 0,
		totalIssueDetectedCost = 0, totalDiseaseAndPestCost = 0, totalHarvestingCost = 0,
		totalMaleLaborCost = 0, totalFemaleLaborCost = 0;
	
	let totalAreaForIrrigation = 0, totalAreaForWeedManagement = 0, totalAreaForFertilization = 0,
		totalAreaForIssueDetection = 0, totalAreaForDiseaseAndPest = 0, totalAreaForHarvesting = 0;
	
	dataArray.forEach(data => {
		// Extract labor rates from the farmer object
		const maleLaborRate = data.Farmer.labour_costs_male || 1;
		const femaleLaborRate = data.Farmer.labour_costs_female || 1;
		
		// Calculate costs and track areas for each category
		if (data.Irrigation) {
			data.Irrigation.forEach(item => {
				totalIrrigationCost += item.cost_acre;
				totalMaleLaborCost += item.male_labour_hours * maleLaborRate;
				totalFemaleLaborCost += item.female_labour_hours * femaleLaborRate;
				totalAreaForIrrigation += parseFloat(data.total_area);
			});
		}
		
		if (data.weed) {
			data.weed.forEach(item => {
				totalWeedManagementCost += item.cost_per_acer;
				totalMaleLaborCost += item.male_labour_hours * maleLaborRate;
				totalFemaleLaborCost += item.female_labour_hours * femaleLaborRate;
				totalAreaForWeedManagement += parseFloat(data.total_area);
			});
		}
		
		if (data.fertilizer) {
			data.fertilizer.forEach(item => {
				totalFertilizerCost += item.fertilizer_cost;
				totalMaleLaborCost += item.male_labour_hours * maleLaborRate;
				totalFemaleLaborCost += item.female_labour_hours * femaleLaborRate;
				totalAreaForFertilization += parseFloat(data.total_area);
			});
		}
		
		if (data.IssueDetected) {
			data.IssueDetected.forEach(item => {
				totalIssueDetectedCost += item.issue_cost;
				totalMaleLaborCost += item.male_labour_hours * maleLaborRate;
				totalFemaleLaborCost += item.female_labour_hours * femaleLaborRate;
				totalAreaForIssueDetection += parseFloat(data.total_area);
			});
		}
		
		if (data.disease_and_pest) {
			data.disease_and_pest.forEach(item => {
				totalDiseaseAndPestCost += item.cost;
				totalMaleLaborCost += item.male_labour_hours * maleLaborRate;
				totalFemaleLaborCost += item.female_labour_hours * femaleLaborRate;
				totalAreaForDiseaseAndPest += parseFloat(data.total_area);
			});
		}
		
		if (data.harvesting) {
			data.harvesting.forEach(item => {
				totalHarvestingCost += item.total_cost;
				totalMaleLaborCost += item.male_labour_hours * maleLaborRate;
				totalFemaleLaborCost += item.female_labour_hours * femaleLaborRate;
				totalAreaForHarvesting += parseFloat(data.total_area);
			});
		}
	});
	
	// Calculate weighted averages
	const weightedAverageIrrigation = totalIrrigationCost / totalAreaForIrrigation;
	const weightedAverageWeedManagement = totalWeedManagementCost / totalAreaForWeedManagement;
	const weightedAverageFertilization = totalFertilizerCost / totalAreaForFertilization;
	const weightedAverageIssueDetection = totalIssueDetectedCost / totalAreaForIssueDetection;
	const weightedAverageDiseaseAndPest = totalDiseaseAndPestCost / totalAreaForDiseaseAndPest;
	const weightedAverageHarvesting = totalHarvestingCost / totalAreaForHarvesting;
	
	return {
		totalIrrigationCost,
		weightedAverageIrrigation,
		totalWeedManagementCost,
		weightedAverageWeedManagement,
		totalFertilizerCost,
		weightedAverageFertilization,
		totalIssueDetectedCost,
		weightedAverageIssueDetection,
		totalDiseaseAndPestCost,
		weightedAverageDiseaseAndPest,
		totalHarvestingCost,
		weightedAverageHarvesting,
		totalMaleLaborCost, // Note: Labor cost does not typically use area for weighting
		totalFemaleLaborCost // Note: Labor cost does not typically use area for weighting
	};
}

module.exports = {
	calculateCostsByCategory
};
