const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(({ id }) => id === contactId);
    if (!contactById) {
      return null;
    }
    return contactById;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const idx = contacts.findIndex(({ id }) => id === contactId);
    if (idx === -1) {
      return null;
    }

    const filteredContacts = contacts.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    return contacts[idx];
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();

    const contactToAdd = {
      id: v4(),
      name,
      email,
      phone,
    };

    const newData = [...contacts, contactToAdd];

    await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2));
    return newData;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
