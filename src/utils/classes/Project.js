import {number, string, object, array} from 'yup';
import Base from './Base';
import Task from './Task';
import Panelist from './Panelist';

const required = string().required();

const instanceOf = (Obj) => {
  return object().test((value) => {
    return Obj.schema.isValidSync(value);
  });
};

export default class Project extends Base {
  constructor(props) {
    let tasks = props.tasks || [];
    let panel = props.panel || [];
    
    tasks = tasks.map(task => new Task(task));
    panel = panel.map(panelist => new Panelist(panelist));

    super({...props, schema: Project.schema}, tasks, panel);
  };

  newPanelist(data) {
    return this._add('panel', Panelist, data);
  }

  newTask(data) {
    return this._add('tasks', Task, data);
  }

  deleteTask(id) {
    return this._delete('tasks', id);
  }

  deletePanelist(id) {
    return this._delete('panel', id);
  }

  _add(name, Obj, data) {
    const instance = new Obj(data);
    this[name].push(instance);
  }

  _delete(name, id) {
    let found = false;
    
    const idStr = typeof id === 'object' ? id.id : id;
    const index = this[name].findIndex(item => item.id === idStr);
    found = index >= 0;

    if(found) {
      this[name].splice(index, 1);
    }

    return found;
  }

  static schema = object().shape({
    name: required,
    companyName: required,
    contactName: required,
    contactEmail: required,
    contactPhone: required,
    requirements: required,
    numberParticipants: number().min(1).required(),
    panel: array().of(instanceOf(Panelist)).default([]),
    tasks: array().of(instanceOf(Task)).default([]),
  });
};