import {GeneralInformation} from "@/src/widgets/Profile";
import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'
import { withAuth } from '@/src/features/private_routes/withAuth'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { Tabs } from '@/src/shared/ui/Tabs/Tabs'
import { HeadMeta } from '@/src/widgets/HeadMeta/HeadMeta'

const valuesTabs = ['general', 'devices', 'management', 'payments']

const EditProfilePage = () => {
  const { locale } = useTranslate()

  const { push, query } = useRouter()

  const [activeTab, setActiveTab] = useState((query.tab as string) || 'general')

  const handleChangeTabValue = (value: string) => {
    setActiveTab(value)
    void push({ query: { tab: value } })
  }

  const tabs = useMemo(() => {
    return [
      { children: locale.profile.profileSetting.generalInformation, value: 'general' },
      { children: locale.profile.profileSetting.devices, value: 'devices' },
      { children: locale.profile.profileSetting.accountManagement, value: 'management' },
      { children: locale.profile.profileSetting.myPayment, value: 'payments' },
    ]
  }, [locale])

  useEffect(() => {
    if (!query.tab || !valuesTabs.includes(query.tab as string)) {
      setActiveTab('general')
      void push({ query: { tab: 'general' } })
    }
  }, [push, query.tab])

  return (
    <>
      <HeadMeta title="Profile Settings" />
      <Tabs.Root
        className="flex flex-col h-full pt-9 pl-6"
        defaultValue={tabs[0].value}
        onValueChange={handleChangeTabValue}
        value={activeTab}
      >
        <Tabs.List className="">
          {tabs.map(el => (
            <Tabs.Item className="flex-shrink-0" key={el.value} value={el.value}>
              {el.children}
            </Tabs.Item>
          ))}
        </Tabs.List>
        <Tabs.Content value={tabs[0].value}>
          <GeneralInformation />
        </Tabs.Content>
        <Tabs.Content className="flex-grow" value={tabs[1].value}>
          <div className="mt-9 text-center">Devices</div>
        </Tabs.Content>
        <Tabs.Content className="flex-grow" value={tabs[2].value}>
          <div className="mt-9 text-center">Account Management</div>
        </Tabs.Content>
        <Tabs.Content className="flex-grow" value={tabs[3].value}>
          <div className="mt-9 text-center">My Payments</div>
        </Tabs.Content>
      </Tabs.Root>
    </>
  )
}

EditProfilePage.getLayout = getLayoutWithSidebar

export default withAuth(EditProfilePage)
