import express from 'express';
import { BarcodeController } from './barcode.controller';

const router = express.Router();

router.get('/', BarcodeController.getProductBarcodeVarientWise);

router.get('/barcode-print', BarcodeController.getAllBarCodeForPrint);

router.get('/barcode', BarcodeController.getAvailableBarCode);
// Kid details with qr code  for the barcode
router.get('/:code', BarcodeController.getSingleBarCodeDetailsForKid);

export const BarcodeRoutes = router;
