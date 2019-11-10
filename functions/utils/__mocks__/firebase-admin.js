const firestore = {};
const auth = {};

const query = {data: () => {}, id: 'someid'};
const querySnapShot = [query];

firestore.collection = jest.fn(() => firestore);
firestore.doc = jest.fn(() => firestore);
firestore.get = jest.fn(() => Promise.resolve(querySnapShot));

module.exports = {
    auth: () => auth,
    firestore: () => firestore,
    initializeApp: jest.fn()
};