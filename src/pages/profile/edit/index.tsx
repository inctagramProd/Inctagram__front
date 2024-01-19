import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'
import { Tabs } from '@/src/shared/ui/Tabs/Tabs'
import { Button } from '@/src/shared/ui/Button/Button'
import { Icon } from '@/src/shared/ui/Icon/Icon'
import { Input } from '@/src/shared/ui/Input/Input'

const EditProfile = () => {
  return (
    <div className={'pt-6 pl-6'}>
      <Tabs
        options={[
          { key: 'general_information', label: 'General information' },
          { key: 'devices', label: 'Devices' },
          { key: 'account_management', label: 'Account Management' },
          { key: 'my_payments', label: 'My payments' },
        ]}
      ></Tabs>
      <div className={'flex gap-12 flex-row mt-6'}>
        <div className={'w-full max-w-[196px]'}>
          <div
            className={
              'w-[196px] h-[196px] bg-dark-500 rounded-full flex justify-center items-center'
            }
          >
            <Icon iconName="Picture" width={48} height={48} />
          </div>
          <div className={'mt-6'}>
            <Button label={'Add a Profile Photo'} style={'outline'}></Button>
          </div>
        </div>
        <div className={'flex-1'}>
          <Input label={'Username'} type={'text'}></Input>
        </div>
      </div>
    </div>
  )
}

EditProfile.getLayout = getLayoutWithSidebar

export default EditProfile
