const fs = require('fs');
const path = require('path');

const SUBSCRIBERS_FILE = path.join(__dirname, '../subscribers.json');

class Subscriber {
  static getAll() {
    if (!fs.existsSync(SUBSCRIBERS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(SUBSCRIBERS_FILE, 'utf8');
    return JSON.parse(data);
  }

  static exists(email) {
    const subscribers = this.getAll();
    return subscribers.includes(email);
  }

  static add(email) {
    const subscribers = this.getAll();
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
      return true;
    }
    return false;
  }
}

module.exports = Subscriber;
