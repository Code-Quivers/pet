import express from 'express';
import { BarcodeController } from './barcode.controller';

const router = express.Router();

router.get('/', BarcodeController.getProductBarcodes);

router.get('/get-single-variant/:variantId', BarcodeController.getSingleVariant);
router.get('/:code', BarcodeController.getSingleBarCode);

export const BarcodeRoutes = router;
