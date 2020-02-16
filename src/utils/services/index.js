import {projects, users, updateMe, createMe} from './firestore';
export {default as apiService} from './api.service';
export {default as storageService} from './storage.service';
export {default as authService} from './auth.service';

export const firestoreService = {
  projects, users, updateMe, createMe
};