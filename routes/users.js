import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  deleteUser
} from '../controllers/usersController.js';
import authorize from '../middleware/authorize.js';
import { registerRules, updateDetailsRules, updatePasswordRules } from '../middleware/validator.js';
import { validationResult } from '../middleware/validationResults.js';

const router = express.Router();

router.post('/register',registerRules,validationResult, register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/me', authorize, getMe);

router.put('/updateDetails', authorize, updateDetailsRules, validationResult, updateDetails);

router.put('/updatePassword', authorize,updatePasswordRules, validationResult, updatePassword);

router.delete('/deleteUser', authorize, deleteUser);

export default router;
