"use client"

import React from 'react'
import withAuth from '@/app/components/auth/withAuth'

const Page = () => {
  return (
    <div>Home page</div>
  )
}

export default withAuth(Page);
