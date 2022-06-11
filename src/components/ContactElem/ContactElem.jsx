import PropTypes from 'prop-types';
import s from './ContactElem.module.css';

const ContactElem = ({ id, name, number, onDeleteContact }) => {
  return (
    <li className={s.itemContact}>
      <p className={s.contact}>{name}:</p>
      <p className={s.contact}>{number}</p>
      <button
        className={s.button}
        type="button"
        onClick={() => {
          onDeleteContact(id);
        }}
      >
        Delete
      </button>
    </li>
  );
};
ContactElem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
export default ContactElem;
