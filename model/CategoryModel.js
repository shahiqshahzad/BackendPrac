import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    adminPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryImage: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("category", categorySchema);
export default Category;
