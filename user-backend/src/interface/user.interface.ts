export interface ProfileInput {
  email: string;
  gender: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
}

export interface CreateUserInput {
  username: string;
  phone: string;
  profile?: ProfileInput;
}
