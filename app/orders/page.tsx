import Header from "@/components/Header"
import ProductCard from "@/components/ProductCard"
import { products } from "@/data/products"

export default function Home(){

  return(
    <div>

      <Header/>

      <div className="grid grid-cols-3 gap-6 p-10">

        {products.map(product=>(
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </div>
  )
}