const express = require('express');
const router = express();

const {getALLProducts, getALLProductstesting} = require("../controllers/product")
// import { getALLProducts, getALLProductstesting } from '../controllers/product.js';

router.route("/").get(getALLProducts);
router.route("/testing").get(getALLProductstesting);

module.exports = router;