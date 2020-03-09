// Model for a User object in the DB
export interface UserType {
  email: string;
  name: string;
  phone: string | null;
  photoURL: string;
  uid: string;
}

// Model for a User
export class User {
  public email: string = '';
  public name: string = '';
  public phone: string = '';
  public photoURL: string = '';
  public uid: string = '';

  constructor(user?: UserType) {
    if (user) {
      this.email = user.email;
      this.name = user.name;
      this.phone = user.phone ? user.phone : '';
      this.photoURL = user.photoURL;
      this.uid = user.uid;
    }
  }
}
