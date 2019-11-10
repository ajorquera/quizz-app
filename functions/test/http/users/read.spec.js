const read = require('../../../http/users/read');
const firebase = require('../../../utils/firebase');
const firestore = firebase.firestore();

let req, res, next;

beforeEach(() => {
    req = {
        params: {
            id: '245fsaf'
        }
    };
    res = {
        json: jest.fn()
    };
    next = jest.fn();
});

test('should get all users', async () => {
    await read(req, res, next);

    expect(res.json).toBeCalled();
});

test('should get a firebase error', async () => {
    const error = {message: 'whateber'}
    firestore.get.mockReturnValueOnce(Promise.reject(error));


    await read(req, res, next);
    
    expect(next).toBeCalledWith({code: 'FIREBASE_ERROR', data: error});
});