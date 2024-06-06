import { useEffect, useState } from "react"

interface CategoryProps{
    category: string
}

const ProductList = ({category}:CategoryProps) => {
    const [product, setProduct] = useState<string[]>([]);
    
    useEffect(() => {
        console.log("Fetching product in ", category);
        setProduct(['Clothing','Household']);
      
    }, [category])
    
    return (
    <>
        <h1 className="text-center">Product List</h1>
        <p>{product}</p>
    </>
  )
}

export default ProductList