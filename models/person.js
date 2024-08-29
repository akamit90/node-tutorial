// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personSchema.pre('save', async function (next) {
  const person = this;

  // Hash the password only if it has been modified (or is new) 
  if (!person.isModified('password')) return next();

  try {
    // Hash password generation

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(person.password, salt);

      // override the plain password with the hashed one 
      person.password = hashedPassword;

      next();
  } catch (error) {
    return next(error);
  }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {

    // Use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch; 
  } catch (error) {
    return done(error);
  }
};

// create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
