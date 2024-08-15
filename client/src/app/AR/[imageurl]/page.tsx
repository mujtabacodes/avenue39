'use client'
import React, { useEffect, useState } from 'react'
import ARExperience from '@components/ARModelViewer'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/config/fetch';
import { IProduct, IProductDetail } from '@/types/types';
import { generateSlug } from '@/config';




export default function Page({ params }: { params: {imageurl:string} }) {
  const searchParams = useSearchParams()
  const Image_id = searchParams.get('Image_id')

  const [ImageUrl, setImageUrl] = useState<string | undefined>()

const getImagehandler = ()=>{
  let imageurl = localStorage.getItem('atHome_Image_url')

if(!imageurl)return 
setImageUrl(imageurl)
}

console.log(Image_id, "Image id")

useEffect(()=>{
  getImagehandler()
},[])

const {
  data: products = [],
  error,
  isLoading,
} = useQuery<IProduct[], Error>({
  queryKey: ['products'],
  queryFn: fetchProducts,
});


const product = products.find((product) => generateSlug(product.name) === params.imageurl);

console.log(product, "product")


let TryAtHomeImage = product && product.productImages.find((image)=>generateSlug(image.public_id) === Image_id)
console.log(TryAtHomeImage?.imageUrl, " TryAtHomeImage")
  return (
    <>

{
!TryAtHomeImage ? 'Unexpected error':
<>
<div>My Post: {TryAtHomeImage.imageUrl}</div>
<ARExperience ImageUrl={TryAtHomeImage.imageUrl}/>
</>

}
    </>
  )
}
