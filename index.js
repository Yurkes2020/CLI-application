const { Command } = require('commander');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('./contacts');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contact = await getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id ${id} not found`);
      }
      console.table(contact);
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      console.table(newContact);
      console.log('\x1B[31m Successfully added');
      break;

    case 'update':
      const updatedContact = await updateContact(id, name, email, phone);
      if (!updateContact) {
        throw new Error(`Error with update contact`);
      }
      console.table(updatedContact);
      break;

    case 'remove':
      const removedContact = await removeContact(id);
      if (!removedContact) {
        throw new Error(`Contact with id ${id} not found`);
      }
      console.table(removedContact);
      console.log('\x1B[31m Successfully deleted');
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
