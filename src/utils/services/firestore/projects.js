import firebase from '../../firebase';
import {extractFirestoreData} from './helpers';
import Project from '../../classes/Project';
import Task from '../../classes/Task';


const firestore = firebase.firestore();

export default {
  create: (data) => {
    const {id, ...newData} = data;

    return firestore.collection('projects').add(newData);
    },
    
    get: async (id) => {
        if(id) {
            return firestore.collection('projects').doc(id).get().then(extractFirestoreData);
        } else {
            return firestore.collection('projects').get().then(querySnap => {
                const projects = [];
                
                querySnap.forEach(snapDoc => {
                    const project = {id: snapDoc.id, ...snapDoc.data()};
                    projects.push(new Project(project));
                });
                return projects;
            }); 
        }
    },
    addTask: async function (projectId, task) {
        const newTask = new Task(task);

        const project = await firestore.collection('projects').doc(projectId).get().then(extractFirestoreData);

        project.tasks = project.tasks || [];

        const data = newTask.toJson();
        project.tasks.push(data);

        await firestore.collection('projects').doc(projectId).update(project);

        return data;
    },
    deleteTask: async function(projectId, id) {
        const project = await this.get(projectId);
        const index = project.tasks.findIndex(item => item.id === id);

        if(index >= 0) {
            project.tasks.splice(index, 1);
            await firestore.collection('projects').doc(projectId).update(project);
        }
    }
};
