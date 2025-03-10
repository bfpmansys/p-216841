export interface Inspection {
    id: string;
    date: Date;
    time: string;
    establishment: string;
    location: {
      lat: number;
      lng: number;
      name: string;
    };
    isPriority: boolean;
  }
  
  export const mockInspections: Inspection[] = [
    {
      id: "1",
      date: new Date(2025, 0, 20), // Jan 20, 2025
      time: "2:00 PM",
      establishment: "Edge Enterprises Corporation Imnida Build.",
      location: {
        lat: 14.5995,
        lng: 120.9842,
        name: "Edge Corp."
      },
      isPriority: true
    },
    {
      id: "2",
      date: new Date(2025, 0, 21), // Jan 21, 2025
      time: "10:00 AM",
      establishment: "Vertex Systems Inc. Main Office",
      location: {
        lat: 14.6042,
        lng: 120.9822,
        name: "Vertex Inc."
      },
      isPriority: false
    },
    {
      id: "3",
      date: new Date(2025, 0, 22), // Jan 22, 2025
      time: "1:30 PM",
      establishment: "Summit Technologies Building A",
      location: {
        lat: 14.6010,
        lng: 120.9876,
        name: "Summit Tech"
      },
      isPriority: true
    },
    {
      id: "4",
      date: new Date(2025, 0, 23), // Jan 23, 2025
      time: "9:00 AM",
      establishment: "Pinnacle Constructions HQ",
      location: {
        lat: 14.5980,
        lng: 120.9790,
        name: "Pinnacle HQ"
      },
      isPriority: false
    }
  ];
  