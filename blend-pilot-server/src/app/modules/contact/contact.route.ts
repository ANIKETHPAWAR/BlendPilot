import { Router } from 'express';
import { contactController } from './contact.controller';
import { validateRequrest } from '../../middlewares/validateRequest';
import { contactValidation } from './contact.validation';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/usre.interface';

const router = Router();

// Public route - anyone can submit contact form
router.post(
  '/',
  validateRequrest(contactValidation.createContactZodSchema),
  contactController.createContact
);

// Protected routes - only admins can access
router.get(
  '/',
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  contactController.getAllContacts
);

router.get(
  '/:id',
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  contactController.getContactById
);

router.patch(
  '/:id/status',
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  contactController.updateContactStatus
);

router.delete(
  '/:id',
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  contactController.deleteContact
);

export { router as contactRoutes };
