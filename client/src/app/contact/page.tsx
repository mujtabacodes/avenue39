import TopHero from '@/components/top-hero'
import { breadcrumbs } from '@/data/data'
import React from 'react'

const Contact = () => {
  return (
    <>
        <TopHero category='Contact Us' breadcrumbs={breadcrumbs}/> 
    </>
  )
}

export default Contact