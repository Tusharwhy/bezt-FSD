export interface User {
  id: number;
  username: string;
  phone: string;
  profile: {
    id: number;
    userId: number;
    email: string;
    gender: "male" | "female" | "other";
    address: string;
    pincode: string;
    city: string;
    state: string;
    country: string;
  };
}
