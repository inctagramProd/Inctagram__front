import { GeneralInformation } from '@/src/features/profile/edit'
import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'
import {useEffect, useMemo, useState} from 'react'
import { useRouter } from 'next/router'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { Tabs } from '@/src/shared/ui'

const valuesTabs = ['general', 'devices', 'management', 'payments']

const EditProfilePage = () => {
  const { push, query } = useRouter()
  const { locale } = useTranslate()
  const [activeTab, setActiveTab] = useState((query.tab as string) || 'general')

  const handleChangeTabValue = (value: string) => {
    setActiveTab(value)
    void push({ query: { tab: value } })
    // void push({ query: { id: query.id, tab: value } })
  }

  const tabs = useMemo(() => {
    return [
      {
        key: 'general_information',
        label: locale.profile.profileSetting.generalInformation,
        value: 'general',
      },
      { key: 'devices', label: locale.profile.profileSetting.devices, value: 'devices' },
      {
        key: 'account_management',
        label: locale.profile.profileSetting.accountManagement,
        value: 'management',
      },
      { key: 'my_payments', label: locale.profile.profileSetting.myPayment, value: 'payments' },
    ]
  }, [locale])

  useEffect(() => {
    // if (!query.tab || !valuesTabs.includes(query.tab as string)) {
    //   setActiveTab('general')
    //   void push({ query: { id: query.id, tab: 'general' } })
    // }
  }, [push, query.tab, query.id])

  return (
    <>
      <Tabs defaultActiveKey={activeTab} options={tabs} onChange={handleChangeTabValue}></Tabs>
      <GeneralInformation />
    </>
  )
}

EditProfilePage.getLayout = getLayoutWithSidebar

export default EditProfilePage
