const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.normalize(
  path.join(__dirname, './db', '/contacts.json'),
);

/* function handlers start */
const parseDataHandler = data => JSON.parse(data);
const getContactsHandler = async () => {
  try {
    let resData = await fs.readFile(contactsPath, 'utf-8', error => {
      if (error) throw error;
    });
    resData = parseDataHandler(resData);

    return resData;
  } catch (error) {
    throw error;
  }
};
const findContactHandler = (contactId, contacts) => {
  return contacts.find(contact => contact.id === contactId);
};
const updateContactsHandler = async contacts => {
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
/* function handlers end */

const listContacts = async () => {
  try {
    const contacts = await getContactsHandler();

    console.table(contacts);
  } catch (e) {
    console.error('listContacts error', e);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await getContactsHandler();
    const searchResult = await findContactHandler(contactId, contacts);

    if (!searchResult) {
      console.log(`Контакт с id: ${contactId} - не найден!`);
    } else {
      console.log(searchResult);
    }
  } catch (e) {
    console.error('getContactById error:', e);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await getContactsHandler();
    const targetContact = await findContactHandler(contactId, contacts);

    if (!targetContact) {
      console.log(`Ошибка удаления! Контакт с id: ${contactId} - не найден.`);
    } else {
      const contactsWithoutRemoved = contacts.filter(
        contact => contact.id !== contactId,
      );

      await updateContactsHandler(contactsWithoutRemoved);

      console.log('Этот контакт был удален: ', targetContact);
    }
  } catch (e) {
    console.error('removeContact error:', e);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await getContactsHandler();
    const newContact = { id: uuidv4(), name, email, phone };
    contacts.push(newContact);

    await updateContactsHandler(contacts);

    console.log('Добавлен новый контакт:', newContact);
  } catch (e) {
    console.error('addContact error:', e);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
