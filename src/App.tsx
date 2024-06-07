import { useState } from "react"
// import ProductList from "./Components/UseEffect/ProductList"
// import UseEffectExample from "./Components/UseEffect/UseEffectExample"
// import UseEffectExample2 from "./Components/UseEffect/UseEffectExample2"
// import FetchingAxios from "./Components/UseEffect/FetchingAxios"
// import FetchingWFetch from "./Components/UseEffect/FetchingWFetch"
// import AsyncAwait from "./Components/UseEffect/AsyncAwait"
// import LoadingIndicator from "./Components/UseEffect/LoadingIndicator"
import DeleteData from "./Components/UseEffect/DeleteData"

const App = () => {
  // const [category, setCategory] = useState('')
  
  return (
    <>
      <h1 className="text-center">React Fetching Data Examples, Using Axios, services, Http, CRUD</h1>
      {/* <FetchingWFetch/> */}
      
      {/* <UseEffectExample/> */}
      {/* <UseEffectExample2/> */}
      {/* <ProductList category={category}/>
      <div>
        <select className="form-select" onChange={(e)=> setCategory(e.target.value)}>
          <option value="">{category}</option>
          <option value="Clothing">Clothing</option>
          <option value="Household">Household</option>
        </select>
      </div> */}
      {/* <AsyncAwait/> */}
      {/* <FetchingAxios/> */}
      {/* <LoadingIndicator/> */}
      <DeleteData/>
    </>
  )
}

export default App