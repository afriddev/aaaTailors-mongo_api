import mongoose, { Types } from "mongoose";
/**
 *
 *
 * mongodb user schema for user
 */

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
    lowercase: true,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    immutable: true,
  },

  image: {
    type: String,
    required: false,
    default: "",
  },
  phoneNumber: {
    type: Number,
    required: false,
    length: 10,
    default: 1234567890,
  },
  orders: {
    type: [{}],
    required: false,
    default: [],
  },
  bagItems: {
    type: [
      {
        image: {
          type: String
        },
        title: {
          type: String
          
        },
        rating: {
          type: String
        },
        price:  {
          type:String
      },
        count: {
          type: Number,
          default: 1,
        },
      },
    ],
    required: false,
    default: [],
  },
});

/**
 *
 *
 * mongodb model for user schema
 */

const User = mongoose.model("users", userSchema);
export default User;
