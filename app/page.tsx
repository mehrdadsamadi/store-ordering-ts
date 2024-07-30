"use client"
import ConfirmButton from '@/components/ConfirmButton'
import { handleLogout } from '@/lib/utils'
import React from 'react'

const HomePage = () => {
  return (
    <ConfirmButton
      title='خروج'
      description='برای خروج مطمعن هستید؟'
      onSubmit={handleLogout}
    />
  )
}

export default HomePage