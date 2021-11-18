import React, { Component } from 'react';
import ContactInput from './components/ContactInput';
import ContactsList from './components/ContactsList/ContactsList';
import ShortId from 'shortid';
import Filter from './components/ContactFilter';
import s from './styles/base.module.scss';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  // перед рендером прорвнює попередній стейт із новим, якщо вони не ріні то записує все в local storage
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  // перед монтуванням впереше перевыряє local storage на наявнысть контактів, якщо вони є то додає їх в стейт.
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  handlerContact = ({ name, number }) => {
    const { contacts } = this.state;

    const newContact = {
      id: ShortId.generate(),
      name: name,
      number: number,
    };
    if (
      contacts.find(contact => contact.name.toLowerCase() === newContact.name.toLowerCase()) ||
      contacts.find(contact => contact.number === newContact.number)
    ) {
      alert(`${newContact.name} is already in contacts!`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  contactFilter = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  render() {
    const { filter } = this.state;

    const filteredNumbers = this.contactFilter();

    return (
      <div className={s.main_container}>
        <h1 className={s.title}>Phonebook</h1>

        <ContactInput onSubmit={this.handlerContact} />

        <h2 className={s.title}>Contacts</h2>

        <Filter onChange={this.changeFilter} value={filter} />

        <ContactsList contacts={filteredNumbers} onDeleteContact={this.deleteContact} />
      </div>
    );
  }
}

export default App;
