const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const argv = yargs(hideBin(process.argv)).argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then((contacts) => console.table(contacts));
      break;

    case "get":
      getContactById(id).then((contact) =>
        console.log(contact || "Contact not found")
      );
      break;

    case "add":
      addContact(name, email, phone).then((newContact) =>
        console.log("Added contact:", newContact)
      );
      break;

    case "remove":
      removeContact(id).then((removedContact) =>
        console.log(removedContact || "Contact not found")
      );
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
