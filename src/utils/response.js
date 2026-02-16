const response = (res, statusCode, message, data) => {
    return res.status(statusCode).json({
        status: statusCode >= 400 ? 'failed' : 'success',
        message,
        data
    });
}

export default response;