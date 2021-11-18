import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShortId from 'shortid';

class ContactInput extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = ShortId.generate();
  numberInputId = ShortId.generate();

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handelChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handelSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handelSubmit}>
        <label id={this.nameInputId}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={name}
            id={this.nameInputId}
            onChange={this.handelChange}
          />
        </label>
        <label id={this.numberInputId}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            value={number}
            id={this.numberInputId}
            onChange={this.handelChange}
          />
        </label>
        <button type="submit">add contact</button>
      </form>
    );
  }
}

ContactInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

console.log();
export default ContactInput;
