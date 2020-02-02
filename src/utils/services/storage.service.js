import firebase from '../firebase';

const storage = firebase.storage();


export default {
  uploadFile: (path, file) => {
    const storageRef = storage.ref();
    const fileName = file.name.replace(/\b/, '-');
    const ref = storageRef.child(`${path}/${fileName}`);

    return ref.put(file).then(() => ref.fullPath);
  },
  getBucket: () => storage.ref().bucket.replace('gs://', '') 
};