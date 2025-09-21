// Success Response
exports.successResponse = function (res, data, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data: data
  });
};

// Error Response
exports.errorResponse = function (res, message, statusCode = 400) {
  return res.status(statusCode).json({
    success: false,
    error: message
  });
};

