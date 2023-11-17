// A function that wraps an async function and catches any errors that occur,
// aslo avoiding the use of try/catch blocks in the controller functions.
module.exports = (fn) => (req, res, next) => fn(req, res, next).catch(next);
