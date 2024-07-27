import React from 'react'
import { ThemeToggle } from './ThemeToggle'

export default function Header() {
  return (
    <div className="fixed bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 top-0 w-[95%] max-w-[540px] flex justify-between items-center p-4">
      <p className="text-xl font-bold">wevote<span className="text-primary">.</span> </p>
      <ThemeToggle className="" />
      </div>
  )
}
