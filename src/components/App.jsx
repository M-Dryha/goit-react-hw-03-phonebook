import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ListContacts from './ListContacts';
import Filter from './Filter';
// import { render } from "@testing-library/react";

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],

    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  deleteContacts = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(c => c.id !== contactId),
    }));
  };

  forSubmitHandler = ({ name, number }) => {
    this.setState(prevState => {
      const { contacts } = prevState;
      const nameContact = contacts.find(
        c => c.name.toLowerCase() === name.toLowerCase()
      );
      if (nameContact) {
        alert(`${name} is already in contact`);
        return;
      }
      return {
        contacts: [
          {
            id: nanoid(),
            name,
            number,
          },
          ...contacts,
        ],
      };
    });
  };

  changeFilter = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };
  getVisibleContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(f =>
      f.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const visibleContact = this.getVisibleContact();
    const { filter } = this.state;

    return (
      <section className="section">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.forSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ListContacts
          contacts={visibleContact}
          onDeleteContact={this.deleteContacts}
        />
      </section>
    );
  }
}
