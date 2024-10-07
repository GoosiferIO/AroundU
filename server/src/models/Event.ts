import mongoose, { Schema, Document } from 'mongoose';

export type EventType = Document & {
  name: string;
  date: Date;
  address: string;
  description?: string;
  coordinates: {
    type: 'Point';
    coordinates: [number, number];
  };
  createdAt: Date;
  updatedAt: Date;
};

export type EventData = {
  name: string;
  date: string;
  address: string;
  description?: string;
  coordinates: {
    type: 'Point';
    coordinates: [number, number];
  };
};

export type EventQuery = {
  date?: Date | string;
  address?: string;
  lat?: number;
  lng?: number;
  radius?: number;
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
    address: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

EventSchema.index({ coordinates: '2dsphere' });

const Event = mongoose.model<EventType>('Event', EventSchema);
export default Event;
