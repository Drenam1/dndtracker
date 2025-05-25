export interface Clock {
  type: "clock";
  id: string;
  name: string;
  description?: string;
  maxSegments?: number;
  currentSegments?: number;
}
