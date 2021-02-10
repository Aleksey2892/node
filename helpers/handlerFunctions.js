const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname, '../db', '/contacts.json');

const _parseData = data => JSON.parse(data);
const getContacts = async () => {
  try {
    const resData = await fs.readFile(contactsPath, 'utf-8', error => {
      if (error) throw error;
    });

    return _parseData(resData);
  } catch (error) {
    throw error;
  }
};
const findContact = (contactId, contacts) => {
  return contacts.find(contact => contact.id === contactId);
};
const updateContacts = async contacts => {
  try {
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts),
      'utf-8',
      error => {
        if (error) throw error;
      },
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getContacts,
  findContact,
  updateContacts,
};
