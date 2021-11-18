import PropTypes from 'prop-types';
import s from './ContactFilter.module.scss';

const Filter = ({ value, onChange }) => {
  return (
    <label>
      <span className={s.filter_label}>Contact filter</span>
      <input type="text" name="filter" value={value} onChange={onChange} />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
