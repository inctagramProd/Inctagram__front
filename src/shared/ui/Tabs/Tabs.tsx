import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadixTabs from '@radix-ui/react-tabs'
import clsx from 'clsx'

type RootProps = Omit<ComponentPropsWithoutRef<typeof RadixTabs.Root>, 'asChild'>

const Root = forwardRef<ElementRef<typeof RadixTabs.Root>, RootProps>(
  ({ className, ...rest }, ref) => {
    if (!rest.defaultValue) {
      console.warn("You forgot to specify the 'defaultValue' property for Tabs.Root")
    }

    return <RadixTabs.Root className={clsx('w-full', className)} ref={ref} {...rest} />
  }
)

type ListProps = Omit<ComponentPropsWithoutRef<typeof RadixTabs.List>, 'asChild'>

const List = forwardRef<ElementRef<typeof RadixTabs.List>, ListProps>(
  ({ className, ...rest }, ref) => {
    return <RadixTabs.List className={clsx('flex items-center', className)} ref={ref} {...rest} />
  }
)

type ItemProps = Omit<ComponentPropsWithoutRef<typeof RadixTabs.Trigger>, 'asChild'>

const Item = forwardRef<ElementRef<typeof RadixTabs.Trigger>, ItemProps>(
  ({ className, ...rest }, ref) => {
    return (
      <RadixTabs.Trigger
        className={
          'h-9 flex-1 p-4 font-semibold text-dark-100 flex justify-center items-center border-b-2 border-b-dark-100 cursor-pointer hover:bg-primary-900 hover:bg-opacity-10 active:bg-primary-500 active:bg-opacity-10 active:text-primary-500 data-[state=active]:text-primary-700 data-[state=active]:border-b-2 data-[state=active]:border-b-primary-700'
        }
        ref={ref}
        {...rest}
      />
    )
  }
)

type ContentProps = Omit<ComponentPropsWithoutRef<typeof RadixTabs.Content>, 'asChild'>

const Content = forwardRef<ElementRef<typeof RadixTabs.Content>, ContentProps>(
  ({ className, ...rest }, ref) => {
    return (
      <RadixTabs.Content
        className={clsx('focus-visible:border rounded[2px] outline-blue-900', className)}
        ref={ref}
        {...rest}
      />
    )
  }
)

export const Tabs = {Content, Item, List, Root}
