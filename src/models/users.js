'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'secret';

const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('customer', 'employee', 'admin'), required: true, defaultValue: 'employee' },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          customer: ['create', 'read', 'update', 'delete'],
          employee: ['read'],
          admin: ['create', 'read', 'update', 'delete', 'read users'],
        };
        console.log(this.role);
        return acl[this.role];
      },
    },
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  // Basic AUTH: Validating strings (username, password)
  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) { return user; }
    throw new Error('Invalid User');
  };

  // Bearer AUTH: Validating a token
  model.authenticateWithToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = await this.findOne({where: { username: parsedToken.username }});
      if (user) { return user; }
      throw new Error('User Not Found');
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return model;
};

module.exports = userSchema;
