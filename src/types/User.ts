export interface User {
  birthdate: number;
  email: string;
  firstName: string;
  gender: string;
  lastName: string;
  location: Location;
  phoneNumber: string;
  title: string;
  username: string;
}

interface Location {
  city: string;
  postcode: number;
  state: string;
  street: string;
}
