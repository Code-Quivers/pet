import express from 'express';
import { BarcodeController } from './barcode.controller';

const router = express.Router();

router.get('/', BarcodeController.getProductBarcodes)

router.get('/:barcodeCode', BarcodeController.getSingleBarCode);

export const BarcodeRoutes = router;
