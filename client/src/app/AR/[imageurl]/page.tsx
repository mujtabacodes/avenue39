'use client'
import ARExperience from '@components/ARModelViewer'
import { useSearchParams } from 'next/navigation'


export default function Page({ params }: { params: {imageurl:string} }) {
  const searchParams = useSearchParams()
  const Image_id:any = searchParams.get('Image_id')
console.log(Image_id, "Image_id")

  return (
    <>

{
!Image_id ? 'Unexpected error':
<>
{/* <ARExperience ImageUrl={Image_id}/> */}
</>

}
    </>
  )
}
