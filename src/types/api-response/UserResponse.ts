export interface UserResponse {
  birthdate: number;
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  location: Location;
  phone_number: string;
  title: string;
  username: string;
}

interface Location {
  city: string;
  postcode: number;
  state: string;
  street: string;
}
