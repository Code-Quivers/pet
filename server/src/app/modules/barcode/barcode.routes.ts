import express from 'express';
import { BarcodeController } from './barcode.controller';

const router = express.Router();

router.get('/', BarcodeController.getProductBarcodes);
router.get('/barcode', BarcodeController.getSingleBarcode);

router.get('/:code', BarcodeController.getSingleBarCodeDetailsForKid);

export const BarcodeRoutes = router;
