import mongoose, { Schema, Document } from 'mongoose';

export type EventType = Document & {
  name: string;
  date: Date;
  location: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

const EventSchema: Schema = new Schema<EventType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model<EventType>('Event', EventSchema);
export default Event;
