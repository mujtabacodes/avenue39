'use client'
import ARExperience from '@components/ARModelViewer'
import { useSearchParams } from 'next/navigation'

export default function Page({ params }: { params: Promise<{ imageurl: string }> }) {
  const searchParams = useSearchParams()
  const Image_id: any = searchParams.get('Image_id')
  console.log(params, "Image_id")

  return (
    <>
      {
        // !Image_id ? 'Unexpected error' :
        <>
          <div className="block md:hidden">

            <ARExperience ImageUrl={Image_id} />
          </div>
          <div className="hidden md:block">
            <div className="flex justify-center items-center h-screen">
              <h1 className="text-2xl">Please open this page on a mobile device to view the AR experience</h1>
            </div>
          </div>
        </>

      }
    </>
  )
}
