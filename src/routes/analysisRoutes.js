const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();

router.post('/', async (req, res) => {
	const {type, id} = req.body;
	
	if (!type || !id) {
		return res.status(404).json({error: 'Filter Type or Name is null'});
	}
	let FilterID;
	try {
		if (type === 'tehsil') {
			FilterID = await prisma.tehsils.findUnique({where: {id: id}});
		}
		res.status(200).json({FilterID: FilterID});
	} catch (error) {
		res.status(400).json({error: error.message});
	}
});


module.exports = router;
