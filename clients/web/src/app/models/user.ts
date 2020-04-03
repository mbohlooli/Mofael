interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  schoolId?: string;
  classroomId?: string;
}
