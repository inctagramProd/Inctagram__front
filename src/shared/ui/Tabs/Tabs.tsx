import React, { useEffect, useRef, useState } from 'react'

type TabsOptionsType = {
  key: string
  label: string
  disabled?: boolean
}

type TypeProps = {
  options: TabsOptionsType[]
  disabled?: boolean
  defaultActiveKey?: string
  onChange?: (value: string) => void
}

export const Tabs = ({
  options,
  defaultActiveKey,
  disabled = false,
  onChange,
  ...props
}: TypeProps) => {
  const [activeTab, setActiveTab] = useState<string | undefined>(defaultActiveKey)

  const tabsBlockRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLInputElement>(null)

  const handleTabClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLInputElement

    if (!target) {
      return
    }

    const activeTabKey: string | null = (target as HTMLInputElement).getAttribute('data-key'),
      activeTabIndex: string | null = (target as HTMLInputElement).getAttribute('data-index'),
      tabDisabled: string | null = (target as HTMLInputElement).getAttribute('data-disabled')

    if (tabDisabled || !activeTabKey || !activeTabIndex) {
      return
    }

    if (onChange) {
      onChange(activeTabKey)
    }

    setActiveTab(activeTabKey)
    changeTabSliderPosition(activeTabIndex)
  }

  const changeTabSliderPosition = (position: string): void => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${100 * parseInt(position)}%)`
    }
  }

  useEffect((): void => {
    if (disabled) {
      return
    }

    let defaultTabKey: string | undefined = defaultActiveKey

    // If default option is disabled or not provided set first options item
    if (
      !defaultTabKey ||
      options.find((option: TabsOptionsType) => option.key === defaultTabKey)?.disabled
    ) {
      defaultTabKey = options[0].key
    }

    const defaultTabElement: Element | null | undefined = tabsBlockRef.current?.querySelector(
      `[data-key="${defaultTabKey}"]`
    )

    // Set slider width based on item count
    if (sliderRef.current) {
      sliderRef.current.style.width = `${100 / options.length}%`
    }

    if (defaultTabElement) {
      const activeTabIndex: string | undefined | null = defaultTabElement.getAttribute('data-index')
      if (!activeTabIndex) {
        return
      }

      setActiveTab(defaultTabKey)
      changeTabSliderPosition(activeTabIndex)
    }
  }, [defaultActiveKey, options])

  return (
    <div
      className={`inline-flex flex-col w-full ${
        disabled ? ' cursor-not-allowed text-dark-300' : ''
      }`}
      ref={tabsBlockRef}
      {...props}
    >
      <div className={`flex flex-row border-b-2 border-dark-100`}>
        {options.map((item: TabsOptionsType, key: number) => {
          return (
            <div
              role={'tab'}
              aria-selected={'true'}
              tabIndex={0}
              key={item.key}
              data-index={key}
              data-key={item.key}
              data-disabled={`${item.disabled || disabled ? 'opacity-0' : ''}`}
              onClick={handleTabClick}
              className={`relative z-10 h-9 flex-1 px-4 text-dark-100 font-semibold flex justify-center items-center border-b-transparent cursor-pointer transition-all focus:border-primary-500 hover:bg-primary-900 hover:bg-opacity-10 active:bg-primary-500 active:bg-opacity-10 ${
                activeTab == item.key && !disabled ? 'text-primary-500' : ''
              } ${item.disabled || disabled ? 'cursor-not-allowed text-dark-300' : ''}`}
            >
              {item.label}
            </div>
          )
        })}
      </div>
      <div
        ref={sliderRef}
        className={`h-0.5 bg-primary-500 ease-in-out -my-0.5 opacity-100 transition-transform duration-300 ${
          disabled ? 'bg-dark-100' : ''
        }`}
      ></div>
    </div>
  )
}
