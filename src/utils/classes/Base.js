import * as yup from 'yup';

export default class Base {
  constructor({schema, ...rest}) {
    this.schema = Base.schema.concat(schema);

    const id = Base.generateId();
    const dateTime = Base.now();

    const props = this.schema.validateSync({id, dateTime, ...rest});

    Object.keys(props).forEach(key => {
      this[key] = props[key];
    });
  }

  toJSON() {
    const {schema, ...props} = this;
    return JSON.parse(JSON.stringify(props));
  }

  toJson() {
    return this.toJSON();
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

  static now() {
    return (new Date()).toISOString();
  }
};