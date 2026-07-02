const Subscriber = require('../models/Subscriber');

const subscribe = (req, res) => {
  const { email } = req.body;

  if (Subscriber.exists(email)) {
    return res.status(409).json({ error: 'Email is already subscribed' });
  }

  const success = Subscriber.add(email);
  if (success) {
    console.log(`[Newsletter] New subscriber added: ${email}`);
    return res.status(200).json({ message: 'Successfully subscribed to the newsletter!' });
  } else {
    return res.status(500).json({ error: 'Failed to save subscriber' });
  }
};

module.exports = {
  subscribe,
};
