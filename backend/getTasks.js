export async function getTasksForUser (userId, userTaskRepo, taskRepo) {
  const usersTaskIds = (await userTaskRepo.getByUserId(userId)).map(row => row.taskId)
  const tasks = await Promise.all(usersTaskIds.map(async taskId => taskRepo.getById(taskId)))
  return tasks
}