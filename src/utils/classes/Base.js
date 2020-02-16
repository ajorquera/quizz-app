import * as yup from 'yup';

export default class Base {
  constructor({schema, ...rest}) {
    this.schema = Base.schema.concat(schema);

    const id = Base.generateId();
    const dateTime = (new Date()).toISOString();

    const props = {id, dateTime, ...rest};

    this.schema.validateSync(props);

    Object.keys(props).forEach(key => {
      this[key] = props[key];
    });
  }

  toJson() {
    const {schema, ...props} = this;
    return JSON.parse(JSON.stringify(props));
  }

  static schema = yup.object().shape({
    id: yup.string().required(),
    dateTime: yup.date().required()
  });

  static generateId(prefix='') {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      
      // eslint-disable-next-line
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return prefix + v.toString(16);
    });
  }
};