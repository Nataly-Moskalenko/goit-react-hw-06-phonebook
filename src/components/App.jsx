import { useDispatch, useSelector } from 'react-redux';

import { addContact, deleteContact } from 'redux/contactsSlice';
import { changeFilter } from 'redux/filterSlice';
import { getFilter, getContacts } from 'redux/selectors';

import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';

import css from './App.module.css';
import { useState, useEffect } from 'react';

export function App() {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);

  const [visibleContacts, setVisibleContacts] = useState(contacts);

  const handleSubmit = (values, { resetForm }) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === values.name.toLowerCase()
      )
    ) {
      window.alert(`${values.name} is already in contacts`);
    } else {
      dispatch(addContact(values));      
    }
    resetForm();    
  };
 
  const handleDeleteContact = id => {
    dispatch(deleteContact(id));    
  };

  const handleChangeFilter = e => {
    const filterValue = e.currentTarget.value;
    dispatch(changeFilter(filterValue));    
  };
  
  useEffect(() => {
    setVisibleContacts(
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    );    
  }, [contacts, filter]);  

  return (
    <div className={css.app}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} handleChange={handleChangeFilter} />
      {contacts.length > 0 && (
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={handleDeleteContact}
        />
      )}
    </div>
  );
}
