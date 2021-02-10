const argv = require('yargs').argv;
const contactsFn = require('./contacts.js');

(function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contactsFn.listContacts();
      break;
    case 'get':
      contactsFn.getContactById(id);
      break;
    case 'add':
      contactsFn.addContact(name, email, phone);
      break;
    case 'remove':
      contactsFn.removeContact(id);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
})(argv);
