export interface Clock {
  id: string;
  name: string;
  description: string;
  totalSegments: number;
  filledSegments: number;
  itemId?: string;
  itemName?: string;
  itemType?: string;
}
