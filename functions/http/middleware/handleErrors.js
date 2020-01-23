const INTERNAL_SERVER_ERROR = 500;

module.exports = (error, req, res, next) => {

    // this gets log in google stackdriver
    console.error(JSON.stringify(error));

    res.status(INTERNAL_SERVER_ERROR).json(error)
};