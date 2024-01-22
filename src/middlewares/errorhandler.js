
const errorHandler = (err, req, res, next) => {
	// if no status or message in error use default 500 code and message
	const statusCode =  400;
	const message = err.message || "Something went wrong.";
	// returns error status code and message
	return res.status(statusCode).json({
		status: statusCode,
		message: message
	})
}

module.exports = errorHandler;