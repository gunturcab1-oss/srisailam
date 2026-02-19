
export interface Car {
  id: string;
  name: string;
  type: string;
  capacity: string;
  image: string;
  description: string;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface SearchResponse {
  answer: string;
  sources?: { title: string; uri: string }[];
}
