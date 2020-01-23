import * as yup from 'yup';


export default class Project {
  constructor(opts) {
    try {
      Project.propSchema.validateSync(opts);
    } catch(error) {
      console.log(error);
    }

    Project.copyToObject(this, opts, this._getNameProps());

    if(!Array.isArray(this.panel)) {
      this.panel = [];
    } 
  }

  toJson() {
    const json = Project.copyToObject({}, this, this._getNameProps());
    return json;
  }

  _getNameProps() {
    return Object.keys(Project.propSchema.describe().fields);
  }
};

Project.copyToObject = (copy, obj, props) => {

  props.forEach(prop => {
    copy[prop] = obj[prop];
  });

  return copy;
};

Project.propSchema = yup.object().shape({
  id: yup.string(),
  name: yup.string().required(),
  companyName: yup.string().required(),
  contactName: yup.string().required(),
  contactEmail: yup.string().required(),
  contactPhone: yup.string().required(),
  requirements: yup.string().required(),
  timestamp: yup.string().required(),
  panel: yup.array().default([]),
  numberParticipants: yup.number().min(1).required()
});