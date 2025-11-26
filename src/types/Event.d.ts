interface IRegency {
  id: string;
  name: string;
}

interface IEvent {
  name: string;
  slug: string;
  category: string;
  startDate: string;
  endDate: string;
  isPublished: boolean;
  isFeatured: boolean;
  description: string;
  isOnline: boolean;
  location: {
    region: string;
    coordinates: {
      x: number;
      y: number;
    };
  };
  banner: string;
}

export type { IEvent, IRegency };
