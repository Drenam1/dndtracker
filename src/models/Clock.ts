export interface Clock {
  id: string;
  name: string;
  description?: string;
  maxSegments?: number;
  currentSegments?: number;
}
