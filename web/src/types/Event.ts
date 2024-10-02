export type EventType = {
  _id: string;
  name: string;
  date: string;
  address: string;
  description?: string;
  coordinates: {
    type: 'Point';
    coordinates: [number, number];
  };
  createdAt: string;
  updatedAt: string;
};

export type EventData = {
  name: string;
  date: string;
  address: string;
  description?: string;
};

export type EventQuery = {
  date?: Date | string;
  address?: string;
  lat?: number;
  lng?: number;
  radius?: number;
};
