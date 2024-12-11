import { memo } from "react";

const Todo = ({ todo, handleTodo }: any) => {
  console.log("Hello From Todo");
  return (
    <div>
      <span className="font-bold text-2xl">{todo}</span>
      <button className=" btn btn-primary mr-10" onClick={handleTodo}>Todo</button>
    </div>
  )
}

export default memo(Todo)
