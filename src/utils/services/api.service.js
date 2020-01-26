import RestApi from '../classes/RestApi';

const url = process.env.REACT_APP_FIREBASE_API_DOMAIN;

export default new RestApi({
    notifications: {path: '/notifications'},
    invitation: {path: '/invitation'},
}, {baseUrl: url});