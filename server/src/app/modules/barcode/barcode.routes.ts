import express from 'express';
import { BarcodeController } from './barcode.controller';

const router = express.Router();

router.get('/', BarcodeController.getProductBarcodeVarientWise);

router.get('/barcode-print', BarcodeController.getAllBarCodeForPrint);

router.get('/barcode', BarcodeController.getSingleBarcode);

router.get('/:code', BarcodeController.getSingleBarCodeDetailsForKid);

export const BarcodeRoutes = router;
