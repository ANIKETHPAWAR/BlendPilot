import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { contactService } from './contact.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createContact = catchAsync(async (req: Request, res: Response) => {
  const contact = await contactService.createContact(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Contact message sent successfully',
    data: contact,
  });
});

const getAllContacts = catchAsync(async (req: Request, res: Response) => {
  const contacts = await contactService.getAllContacts();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Contacts fetched successfully',
    data: contacts,
  });
});

const getContactById = catchAsync(async (req: Request, res: Response) => {
  const contact = await contactService.getContactById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Contact fetched successfully',
    data: contact,
  });
});

const updateContactStatus = catchAsync(async (req: Request, res: Response) => {
  const contact = await contactService.updateContactStatus(req.params.id, req.body.status);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Contact status updated successfully',
    data: contact,
  });
});

const deleteContact = catchAsync(async (req: Request, res: Response) => {
  const contact = await contactService.deleteContact(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Contact deleted successfully',
    data: contact,
  });
});

export const contactController = {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
};
