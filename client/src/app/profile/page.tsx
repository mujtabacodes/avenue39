import TopHero from '@/components/top-hero'
import { profilebreadcrumbs } from '@/data/data'
import React, { Fragment } from 'react'

export default function Profile() {
  return (
    <Fragment>
      <TopHero breadcrumbs={profilebreadcrumbs} />
    <div>Profile</div>
    </Fragment>
  )
}
