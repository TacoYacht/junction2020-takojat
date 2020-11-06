import * as _ from "underscore";
import { Task } from "./Task";

export function TaskList() {
  const list = [{ name: "task 1", description: "task description" }, { name: "task 2", description: "task description" }];

  return (
    <div className="task-list">
      <h1>{"This is a list of tasks"}</h1>
      {_.map(list, (task, i) => {
        return (<Task task={task} key={i} />);
      })}
    </div>
  );
}