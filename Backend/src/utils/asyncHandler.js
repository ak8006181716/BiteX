const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
     console.error(error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something wrong on the server",
      errors: error.errors || [],
    });
  }
};

export default asyncHandler ;
