const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const readContactsFile = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

const writeContactsFile = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    throw error;
  }
};

const listContacts = async () => {
  try {
    const contacts = await readContactsFile();
    return contacts;
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await readContactsFile();
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await readContactsFile();
    const contactToRemove = contacts.find(
      (contact) => contact.id === contactId
    );
    if (!contactToRemove) return null;
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await writeContactsFile(updatedContacts);
    return contactToRemove;
  } catch (error) {
    throw error;
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = { id: Date.now(), name, email, phone };
    const contacts = await readContactsFile();
    const updatedContacts = [...contacts, newContact];
    await writeContactsFile(updatedContacts);
    return newContact;
  } catch (error) {
    throw error;
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
