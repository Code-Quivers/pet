import express from 'express';
import { BarcodeController } from './barcode.controller';

const router = express.Router();

router.get('/', BarcodeController.getProductBarcodes);
router.get('/barcode', BarcodeController.getAvailableBarCode);

router.get('/info/:code', BarcodeController.getSingleBarCodeDetailsForKid);

export const BarcodeRoutes = router;
