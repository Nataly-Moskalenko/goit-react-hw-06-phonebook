import css from './App.module.css';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';
// import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  deleteContact,
  visibleContacts,
} from 'redux/contactsSlice';
import { changeFilter } from 'redux/filterSlice';
import { getFilter, getContacts } from 'redux/selectors';

export function App() {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact(values));
    resetForm();
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleChangeFilter = e => {
    dispatch(changeFilter(e.currentTarget.value));
    dispatch(visibleContacts(e.currentTarget.value));
  };

  // const handleVisibleContacts = filter => {
  //   dispatch(visibleContacts(filter));
  // };

  // const getVisibleContacts = handleVisibleContacts();

  // const [filter, setFilter] = useState('');
  // const [contacts, setContacts] = useState(() => {
  //   return (
  //     JSON.parse(window.localStorage.getItem('contacts')) ?? [
  //       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //     ]
  //   );
  // });

  // useEffect(() => {
  //   window.localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  // const deleteContact = id => {
  //   setContacts(contacts.filter(contact => contact.id !== id));
  // };

  // const addContact = (values, { resetForm }) => {
  //   const newContact = {
  //     id: nanoid(),
  //     name: values.name,
  //     number: values.number,
  //   };
  //   if (
  //     contacts.find(
  //       contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
  //     )
  //   ) {
  //     window.alert(`${newContact.name} is already in contacts`);
  //   } else {
  //     setContacts([newContact, ...contacts]);
  //   }
  //   resetForm();
  // };

  // const changeFilter = e => {
  //   setFilter(e.currentTarget.value);
  // };

  // const getVisibleContacts = () => {
  //   const normalizedFilter = filter.toLowerCase();
  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(normalizedFilter)
  //   );
  // };

  // const visibleContacts = getVisibleContacts();

  return (
    <div className={css.app}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} handleChange={handleChangeFilter} />
      <ContactList contacts={contacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
}
