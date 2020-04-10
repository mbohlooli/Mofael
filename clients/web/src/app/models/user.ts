export class User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  schoolId?: string;
  classroomId?: string;

  constructor(object) {
    //TODO: make models that inherit from this model (Educational director, student, teacher, manager)
    this._id = object._id;
    this.username = object.username;
    this.firstName = object.firstName;
    this.lastName = object.lastName;
    this.roles = object.roles;

    if (object.schoolId) this.schoolId = object.schoolId;
    if (object.classroomId) this.schoolId = object.schoolId;
  }

  public hasPermission(degree) {
    for (let role of this.roles) if (role.degree <= degree) return true;
    return false;
  }

  public roleIs(name) {
    for (let role of this.roles) if (role.name == name) return true;
    return false;
  }
}
