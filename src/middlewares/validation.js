exports.validate = (schema) => (req, res, next) => {
    const {
      error
    } = schema.validate(req.body);
    if (error) {
        res.status(422).json({
            status: 422,
            message: error.details[0].message
        })
        return
    } else {
      next();
    }
  };