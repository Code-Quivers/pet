/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer';
import path from 'path';

// ! ============================================== User ==============================================

// user
// const userStorage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, 'uploads/users/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const uploadProfileImage = multer({
//   storage: userStorage,
//   limits: { fileSize: 512 * 1024 }, // 512kb

//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|/; // filetypes you will accept
//     const mimetype = filetypes.test(file.mimetype); // verify file is == filetypes you will accept
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // extract the file extension and convert to lowercase

//     // if mimetype && extname are true, then no error
//     if (mimetype && extname) {
//       return cb(null, true);
//     }

//     // if mimetype or extname false, give an error of compatibility
//     return cb(new Error('Only jpeg, jpg and png file will be accepted !!'));
//   },
// });
// ! ============================================== Styles ==============================================

// assets photos
const categoryStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/categoryImg/');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + '-' + file.originalname;
    cb(null, uniqueFilename);
  },
});

//
const uploadCategoryImage = multer({
  storage: categoryStorage,
  limits: { fileSize: 512 * 2 * 1024 }, // 1mb

  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|/; // filetypes you will accept
    const mimetype = filetypes.test(file.mimetype); // verify file is == filetypes you will accept
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // extract the file extension and convert to lowercase

    // if mimetype && extname are true, then no error
    if (mimetype && extname) {
      return cb(null, true);
    }

    // if mimetype or extname false, give an error of compatibility
    return cb(new Error('Only jpeg, jpg and png file will be accepted !!'));
  },
});

//Sub Category Image
const subCategoryStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/subCategoryImg/');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + '-' + file.originalname;
    cb(null, uniqueFilename);
  },
});

// upload middleware with fileValidator
const uploadSubCategoryImage = multer({
  storage: subCategoryStorage, // Use storageForTackPack instead of undefined storage
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 mb

  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|/; // filetypes you will accept
    const mimetype = filetypes.test(file.mimetype); // verify file is == filetypes you will accept
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // extract the file extension and convert to lowercase

    // if mimetype && extname are true, then no error
    if (mimetype && extname) {
      return cb(null, true);
    }

    // if mimetype or extname false, give an error of compatibility
    return cb(new Error('Only Image file is required !!'));
  },
});

// Product Image
const productStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/productImg/');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + '-' + file.originalname;
    cb(null, uniqueFilename);
  },
});

// upload middleware with fileValidator
const uploadProductImage = multer({
  storage: productStorage, // Use storageForTackPack instead of undefined storage
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 mb

  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|/; // filetypes you will accept
    const mimetype = filetypes.test(file.mimetype); // verify file is == filetypes you will accept
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // extract the file extension and convert to lowercase

    // if mimetype && extname are true, then no error
    if (mimetype && extname) {
      return cb(null, true);
    }

    // if mimetype or extname false, give an error of compatibility
    return cb(new Error('Only Image file is required !!'));
  },
});

export const FileUploadHelper = {
  uploadCategoryImage,
  uploadSubCategoryImage,
  uploadProductImage,
};
