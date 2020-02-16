import * as yup from 'yup';
import Base from './Base';

export default class Task extends Base {
  constructor(props) {
    super({schema: Task.schema, ...props});
  }

  addGeopoint(geopoint) {
    Task.geopointSchema.validateSync(geopoint);
  }

  addPhotos() {

  }

  setFinish() {

  }

  getResult() {

  }

  describe() {
    
  }

  static schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    todos: yup.array().of(yup.object().shape({
      label: yup.string().required(),
      requirements: yup.array().of(yup.string().oneOf(['geopoint', 'photos'])),
    })).required()
  });

  static geopointSchema = yup.object().shape({
    latitude: yup.number().required(),
    longitude: yup.number().required()
  })
}

