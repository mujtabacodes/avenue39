'use client'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogOverlay, } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import SliderComponent from '@/components/card-slider/card-slider'
import { tankyousildercards } from '@/data'

const ThankYouPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDialogOpen(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div>Thank You Page</div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogOverlay className="bg-white/80" />
        <DialogContent className="sm:max-w-[80%] lg:max-w-[60%] bg-white px-0 sm:rounded-none border border-black shadow-none gap-0 pb-0">
          <div className="pb-4 px-5 xs:px-10 md:px-20 me-4 xs:me-7 mt-6 max-h-[80vh] overflow-y-auto custom-scroll">
            <h2 className="text-center font-bold text-5xl">
            Get 10% Off
            </h2>
            <p className='mt-10 text-center'>Your Next Purchase/</p>
            <div className='mt-16 flex justify-center'>
                <Button className='w-60 h-16 flex justify-center items-center text-secondary rounded-2xl text-sm font-light'>Shop Now</Button>
            </div>
            <div className='mt-16 mb-4'>
                <SliderComponent cards={tankyousildercards} isModel={true}/>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ThankYouPage
