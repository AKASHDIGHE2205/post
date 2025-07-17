import { useMemo, useState } from "react";

const Test = () => {
    const [count, setCount] = useState(0);
    const [todo, setTodo] = useState<any[]>([]);
    
    const calculation = useMemo(()=>expensiveCalc(count),[count]);    
    const Increment = () => {
        setCount((count) => count + 1);
    }
    
    const addTodo = () => {
        setTodo([...todo, "new Todo"])
    }
    return (
        <>
            <div>
                <button onClick={Increment} type="button" className="btn btn-primary">Count</button>
                <button onClick={addTodo} type="button" className="btn btn-primary">Add Todo</button>
                Count : {count}
                Todo :{todo.map((item, index) => (<><p key={index}>{item}</p></>))}
            </div>
            <div>
                <h1>Expensive </h1>
                {calculation}
            </div>
        </>
    )

}
const expensiveCalc = (num: any) => {
    console.log("calculation....");
    for (let i = 0; i < 100000000; i++) {
        num += 1;
    }
    return num;


}

export default Test;
