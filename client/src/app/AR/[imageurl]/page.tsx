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
  const Image_id:any = searchParams.get('Image_id')
console.log(Image_id, "Image_id")

  return (
    <>

{
!Image_id ? 'Unexpected error':
<>
<div>My Post: {Image_id}</div>
<ARExperience ImageUrl={Image_id}/>
</>

}
    </>
  )
}
