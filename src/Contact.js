import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

function Contact() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    subject: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    contactNumber: '',
    subject: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setFormErrors({
      ...formErrors,
      [name]: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation
    let errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.contactNumber.trim()) {
      errors.contactNumber = 'Contact number is required';
    }
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    if (Object.keys(errors).length === 0) {
      try {
        console.log('hello');
        // Send POST request to backend
        const response = await axios.post('http://localhost:8080/contact', formData);
        console.log('Response:', response.data);
        // Add contact to contacts list
        setContacts([...contacts, formData]);
        // Reset form after submission
        setFormData({
          name: '',
          email: '',
          contactNumber: '',
          subject: ''
        });

        
      } catch (err) {
        console.error('Error submitting form:', err);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const handleDelete = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          {formErrors.name && <span className="error">{formErrors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          {formErrors.email && <span className="error">{formErrors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input type="text" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
          {formErrors.contactNumber && <span className="error">{formErrors.contactNumber}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <textarea id="subject" name="subject" value={formData.subject} onChange={handleChange}></textarea>
          {formErrors.subject && <span className="error">{formErrors.subject}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="contact-list">
        <h3>Contact List</h3>
        <ul>
          {contacts.map((contact, index) => (
            <li key={index}>
              <strong>{contact.name}</strong> - {contact.email}
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Contact;
