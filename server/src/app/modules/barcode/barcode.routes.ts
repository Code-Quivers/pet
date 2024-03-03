import express from 'express';
import { BarcodeController } from './barcode.controller';

const router = express.Router();

router.get('/:productCode', BarcodeController.getSingleBarCode);

export const BarcodeRoutes = router;
