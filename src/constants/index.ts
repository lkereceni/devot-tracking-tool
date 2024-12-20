export const modalType = {
  create: "CREATE",
  edit: "EDIT",
  stopAll: "STOP_ALL",
  stop: "STOP",
  delete: "DELETE",
} as const;

export const firestoreCollection = {
  tasks: "tasks",
} as const;

export const firestoreTasksCollection = {
  id: "id",
  time: "time",
  description: "description",
  date: "date",
  userId: "userId",
  isStopped: "isStopped",
} as const;

export const appRoutes = {
  trackers: "/trackers",
  history: "/history",
  login: "/login",
  register: "/register",
} as const;

export const authType = {
  login: "LOGIN",
  register: "REGISTER",
} as const;
