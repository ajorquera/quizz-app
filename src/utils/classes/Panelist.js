import {string, object} from 'yup';
import Base from './Base';

const required = string().required();

export default class Panelist extends Base {
  constructor(props) {
    super({...props, schema: Panelist.schema});
  }

  static schema = object().shape({
    name: required,
    phone: required,
    email: required
  });
}