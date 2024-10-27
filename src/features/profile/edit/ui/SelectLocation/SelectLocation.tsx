import React, { ComponentPropsWithoutRef, useState } from 'react'
import Select, { SingleValue } from 'react-select'
import { City, Country, ICity, ICountry } from 'country-state-city'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { useField } from 'formik'
import classNames from 'classnames'

interface Option {
  label: string
  value: string
}

type Props = {
  name?: string
} & ComponentPropsWithoutRef<'select'>

export const LocationSelector = ({ name, ...restProps }: Props) => {
  const { locale } = useTranslate()

  const [countryField] = useField('country')
  const [cityField] = useField('city')

  const [selectedCountry, setSelectedCountry] = useState<SingleValue<Option>>(null)
  const [selectedCity, setSelectedCity] = useState<SingleValue<Option>>(null)

  // Список стран для выпадающего списка
  const countryOptions: Option[] = Country.getAllCountries().map((country: ICountry) => ({
    value: country.isoCode,
    label: country.name,
  }))

  // Список городов, если выбрана страна
  const cityOptions: Option[] =
    selectedCountry && City.getCitiesOfCountry(selectedCountry.value)
      ? City.getCitiesOfCountry(selectedCountry.value).map((city: ICity) => ({
          value: city.name,
          label: city.name,
        }))
      : []

  // Обработка выбора страны
  const handleCountryChange = (country: SingleValue<Option>) => {
    setSelectedCountry(country)
    countryField.onChange({ target: { name: countryField.name, value: country?.label } })
    setSelectedCity(null) // Сбрасываем выбранный город при изменении страны
  }

  // Обработка выбора города
  const handleCityChange = (city: SingleValue<Option>) => {
    setSelectedCity(city)
    cityField.onChange({ target: { name: cityField.name, value: city?.value } })
  }

  return (
    <div className={'flex gap-x-6 w-full max-sm:flex-col max-sm:gap-y-4'}>
      <div className={'w-full '}>
        <label htmlFor="country" className={'mb-1 text-light-900 text-sm'}>
          {locale.profile.profileSetting.selectYourCountry}
        </label>
        <Select
          inputId="country"
          // className={'text-dark-300'}
          options={countryOptions}
          value={selectedCountry}
          onChange={handleCountryChange}
          placeholder={locale.profile.profileSetting.country}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: 'transparent',
              color: 'red',
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: 'black',
              color: 'white',
            }),
          }}
        />
      </div>
      <div className={'w-full'}>
        <label htmlFor="city" className={'mb-1 text-light-900 text-sm'}>
          {locale.profile.profileSetting.selectYourCity}
        </label>
        <Select
          inputId="city"
          // className={'text-dark-300'}
          options={cityOptions}
          value={selectedCity}
          onChange={handleCityChange}
          placeholder={locale.profile.profileSetting.city}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: 'transparent',
              color: 'red',
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: 'black',
              color: 'whitesmoke',
            }),
          }}
        />
      </div>
    </div>
  )
}