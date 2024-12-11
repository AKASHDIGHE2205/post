import { useCallback, useState } from "react"
import Todo from "./Todo";

const Test = () => {
  const [count, setCount] = useState(0);
  const [todo, setTodo] = useState<any[]>([]);

  const handleCount = () => { setCount((count) => count + 1) };

  const handleTodo = useCallback(() => {
    setTodo([...todo, "new Todo"])
  }, [todo]);

  return (
    <div className="justify-center gap-12">

      <button className="btn btn-error" onClick={handleCount}>Count</button>
      <span>{count}</span>
      <Todo todo={todo} handleTodo={handleTodo} />
    </div>
  )
}

export default Test
