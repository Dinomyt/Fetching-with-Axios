import { useState, useEffect } from "react"

const UseEffectExample = () => {

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("This will re-run everytime our dependency has changed The count is ", counter);
  }, [counter])


  useEffect(() => {
    console.log("Subscribe inside our useEffect")

    return () => {
      console.log("Unsubscribe from our clean up function", counter);
    }

  }, [counter])

  const handleIncrement = () => {
    setCounter(x => x+1);
  }

  const handleDecrement = () => {
    if (counter > 0) {
        setCounter(x => x-1);
    }
  }



  return (
    <>
        <h1 className="text-center">UseEffect Example1</h1>
        <div className="container d-flex justify-content-center">
            <div className="row justify-content-center">
                <div className="col-6 d-flex flex-column align-items-center">
                    <h2>{counter}</h2>
                    <div>
                    <button className="btn btn-outline-primnary mx-3 m-2" onClick={handleDecrement}>Decrease</button>
                    <button className="btn btn-outline-primnary mx-3 m-2" onClick={handleIncrement}>Increase</button>
                    </div>
                </div>
            </div>
            
        </div>

    </>
  )
}

export default UseEffectExample