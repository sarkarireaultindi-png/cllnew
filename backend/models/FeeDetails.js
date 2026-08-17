import mongoose from "mongoose";

const feeDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
      unique: true,
      index: true,
    },

    category: {
      type: String,
      enum: ["UR", "EWS", "OBC", "SC", "ST"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("FeeDetails", feeDetailsSchema);