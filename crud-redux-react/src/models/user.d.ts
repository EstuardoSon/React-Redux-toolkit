export interface User {
  name: string;
  email: string;
  github: string;
}

export interface UserwithId extends User {
  id: string;
}
