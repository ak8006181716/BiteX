import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    type: {
      type: String,
      enum: ["direct", "group"],
      default: "direct",
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

conversationSchema.pre("save", function (next) {
  if (!Array.isArray(this.participants) || this.participants.length < 2) {
    return next(new Error("Conversation must have at least 2 participants"));
  }

  const uniqueParticipants = new Set(this.participants.map((participant) => participant.toString()));

  if (uniqueParticipants.size !== this.participants.length) {
    return next(new Error("Participants must be unique"));
  }

  next();
});

conversationSchema.index({ participants: 1 });
conversationSchema.index({ lastMessage: 1 });

const Conversation = mongoose.model("Conversation", conversationSchema);

export { Conversation };