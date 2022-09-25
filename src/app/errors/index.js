class AppError extends Error {
  constructor(message = 'Invalid Request', status = 400) {
    super(message);
    this.status = status;
  }
}

module.exports = AppError;
