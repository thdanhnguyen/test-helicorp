const validateNewsletter = (req, res, next) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  next();
};

module.exports = {
  validateNewsletter,
};
