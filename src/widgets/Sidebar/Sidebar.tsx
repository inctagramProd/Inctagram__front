import { LinkItem } from './LinkedItem'
import { LogOut } from '@/src/features/auth/logOut'
import { StoreProvider } from '@/src/app/providers'

type Props = { className?: string; theme?: 'dark' | 'light' }

export const Sidebar = (props: Props) => {
  const {
    className = `fixed bottom-0 left-0 sm:h-screen 
  sm:top-[60px]  sm:left-0 sm:w-[220px] 
  sm:flex-col flex flex-row
  gap-y-[60px]  z-[20]`,
    theme = 'dark',
  } = props
  const container = `border-r-[1px] border-dark-300 h-[60px]
                w-[100%] bg-dark-700 flex flex-col gap-y-[56px] py-20
                max-sm:flex max-sm:flex-row max-sm:items-center max-sm:top-unset max-sm:py-0 max-sm:px-0 max-sm:bottom-0 max-sm:max-w-none max-sm:h-[60px] max-sm:bg-dark-700 max-sm:border-dark-300 max-sm:border-r-0 max-sm:border-b-0 max-sm:border-y  max-sm:border-t-[1px] max-sm:pt-0
                ${className}`,
    upperBlock = `flex w-[100%] flex-col justify-around gap-y-[24px] items-start max-sm:items-center max-sm:flex-row`,
    bodyBlock = ` flex w-[196px] flex-row gap-y-[24px] gap-y-[256px]
                items-start gap-y-[180px] sm:flex-col sm:flex hidden sm:block`

  return (
    <StoreProvider>
      <div className={container}>
        <div className={upperBlock}>
          <LinkItem iconName={'HomeIcon'} label={'Home'} link={'/home'} style={'default'} />
          <LinkItem iconName={'PlusSquare'} label={'Create'} link={'/create'} style={'default'} />
          <LinkItem iconName={'Person'} label={'My Profile'} link={'/profile'} style={'default'} />
          <LinkItem
            iconName={'MessageCircle'}
            label={'Messanger'}
            link={'/message'}
            style={'default'}
          />
          <LinkItem iconName={'Search'} label={'Search'} link={'/search'} style={'default'} />
        </div>
        <div className={bodyBlock}>
          <div className={`flex sm:flex-col sm:gap-y-[24px]`}>
            <LinkItem
              iconName={'TrendingUp'}
              label={'Statistics'}
              link={'/statistics'}
              style={'default'}
            />
            <LinkItem
              iconName={'Bookmark'}
              label={'Faivorites'}
              link={'/faivorites'}
              style={'default'}
            />
          </div>
        </div>
        <div className={`flex flex-1 items-end`}>
          <div className={`hidden sm:flex`}>
            <LogOut />
          </div>
        </div>
      </div>
    </StoreProvider>
  )
}
