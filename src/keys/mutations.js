export const taskMutationKeys = {
  add: () => ["addTask"],
  update: taskId => ["updateTask", taskId],
  updateStatus: () => ["updateTaskStatus"],
  delete: taskId => ["deleteTask", taskId],
};
