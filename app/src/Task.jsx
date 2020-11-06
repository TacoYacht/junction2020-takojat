export function Task(task) {
  return (
    <div className="task-view">
      <p>{"Task name: "}{task.name}</p>
      <p>{"Task description: "}{task.description}</p>
    </div>
  );
}