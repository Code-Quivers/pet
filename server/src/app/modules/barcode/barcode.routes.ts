import express from 'express';
import { BarcodeController } from './barcode.controller';

const router = express.Router();

router.get('/', BarcodeController.getBarcodeController);

router.get('/:barcodeCode', BarcodeController.getSingleBarCode);

export const BarcodeRoutes = router;
