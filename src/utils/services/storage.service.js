import firebase from '../firebase';

const storage = firebase.storage();


export default {
  uploadFile: function(path, file) {
    const storageRef = storage.ref();
    const fileName = file.name.trim().replace(/\b/, '-');
    const ref = storageRef.child(`${path}/${fileName}`);

    return ref.put(file).then(() => this.getFileUrl(ref.fullPath));
  },
  getBucket: () => storage.ref().bucket.replace('gs://', ''),
  getFileUrl: function(path) {
    return `https://storage.googleapis.com/${this.getBucket()}/${path}`;
  }
};