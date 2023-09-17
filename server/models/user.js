// Import required modules
const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt'); 

// Defining the user schema
const userSchema = mongoose.Schema(
  {
    username: { type: String, required: [true, 'username is Required!'] }, 
    email: { type: String, unique: true, required: [true, 'email is Required!'] }, 
    password: {
      type: String,
      minLength: [8, 'Password Must Be 8 characters or more!'], 
      required: [true, 'Password is Required!'], 
    },
  },
  {
    timestamps: true, 
  },
);

// Creating a virtual field for confirming passwords
userSchema
  .virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set(value => (this._confirmPassword = value));

// Validating passwords before saving
userSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Passwords need to match!'); // Invalidate the confirmPassword field if passwords don't match
  }
  next();
});

// Hashing the password before saving to the database
userSchema.pre('save', async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 6); // Hash the password using bcrypt
    console.log('🚀 ~ file: user.js:32 ~ hashedPassword:', hashedPassword); 
    console.log('PASSWORD', this.password); 
    this.password = hashedPassword; // Replace the user's password with the hashed password
    next();
  } catch (error) {
    console.log('HASHING ERROR!!', error); 
  }
});


const model = mongoose.model('User', userSchema);
module.exports = model;
