export const extractFirestoreData = async function extractFirestoreData(docRef) {
    const id = docRef.id;
    const data = docRef.data();
    return {id, ...data};
};