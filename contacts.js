const { v4: uuidv4 } = require('uuid');

const handlers = require('./helpers/handlerFunctions');

const listContacts = async () => {
  try {
    const contacts = await handlers.getContacts();

    console.table(contacts);
  } catch (e) {
    console.error('listContacts error', e);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await handlers.getContacts();
    const searchResult = await handlers.findContact(contactId, contacts);

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
    const contacts = await handlers.getContacts();
    const targetContact = await handlers.findContact(contactId, contacts);

    if (!targetContact) {
      console.log(`Ошибка удаления! Контакт с id: ${contactId} - не найден.`);
    } else {
      const contactsWithoutRemoved = contacts.filter(
        contact => contact.id !== contactId,
      );

      await handlers.updateContacts(contactsWithoutRemoved);

      console.log('Этот контакт был удален: ', targetContact);
    }
  } catch (e) {
    console.error('removeContact error:', e);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await handlers.getContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    contacts.push(newContact);

    await handlers.updateContacts(contacts);

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
