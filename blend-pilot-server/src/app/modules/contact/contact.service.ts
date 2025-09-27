import { Contact } from './contact.model';
import { IContact } from './contact.interface';
import { Types } from 'mongoose';

const createContact = async (contactData: IContact): Promise<IContact> => {
  const contact = await Contact.create(contactData);
  return contact;
};

const getAllContacts = async (): Promise<IContact[]> => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  return contacts;
};

const getContactById = async (id: string): Promise<IContact | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error('Invalid contact ID');
  }
  const contact = await Contact.findById(id);
  return contact;
};

const updateContactStatus = async (id: string, status: string): Promise<IContact | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error('Invalid contact ID');
  }
  const contact = await Contact.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  return contact;
};

const deleteContact = async (id: string): Promise<IContact | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error('Invalid contact ID');
  }
  const contact = await Contact.findByIdAndDelete(id);
  return contact;
};

export const contactService = {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
};
