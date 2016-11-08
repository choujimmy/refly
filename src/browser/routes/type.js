import React from 'react'

export type Context = {
  next: Function
}

export type Page = {
  title: string,
  component: React.Component,
  description?: string,
  status?: number
}
