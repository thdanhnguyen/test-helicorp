const validateChat = (req, res, next) => {
  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'Message is required' });
  }

  next();
};

module.exports = {
  validateChat,
};
