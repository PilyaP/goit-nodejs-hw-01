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
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact || null;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await readContactsFile();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIndex === -1) {
      return null;
    }
    const removedContact = contacts.splice(contactIndex, 1)[0];
    await writeContactsFile(contacts);
    return removedContact;
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
