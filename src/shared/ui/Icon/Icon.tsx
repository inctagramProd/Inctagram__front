import React, { ComponentPropsWithoutRef, useState } from 'react'
import * as Icons from '../../assets/icons/icons'
import { Iicon } from './../../assets/icons/icons';



export const Icon= ({ width=24, height=24, fillType='outline',theme='dark',value}:Iicon) => {
  let bg=theme==='dark'?'dark':'white'
    return (
      <div className='flex-col'>
        <div className={`bg-${bg} w-[100%] flex `}>
          <Icons.ArrowIosBack width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.ArrowIosForward width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Bell width={width} height={height} fillType={fillType} theme={theme} value={value}/>
          <Icons.Block width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Close width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Expand width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Menu width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Picture width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.PlusCircle width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Search width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Settings width={width} height={height} fillType={fillType} theme={theme}/>
      </div>
      <div className={`bg-${bg} w-[100%] flex `}>
          <Icons.PlayCircle width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.PauseCircle width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.RadioBtnChk width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.ArrowIosUp width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.ArrowIosDown width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Calendar width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.LogOut width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Bookmark width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.TrendingUp width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Person width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.PlusSquare width={width} height={height} fillType={fillType} theme={theme}/>
      </div>
      <div className={`bg-${bg} w-[100%] flex `}>
          <Icons.HomeIcon width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.ArrowBack width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.ArrowForward width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Palette width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Layers width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.EyeOff width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Eye width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.PaperPlane width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.MoreHorizontal width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.MessageCircle width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.PersonRemove width={width} height={height} fillType={fillType} theme={theme}/>
      </div>
      <div className={`bg-${bg} w-[100%] flex `}>
          <Icons.PersonAdd width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Mic width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Copy width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Pin width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Heart width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Email width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Trash width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Edit width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Maximize width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.CreditCard width={width} height={height} fillType={fillType} theme={theme}/>
      </div>
      <div className={`bg-${bg} w-[100%] flex `}>
          <Icons.GithubLogo width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Recaptcha width={width} height={height}/>
          <Icons.FaceBookLogo width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.GoogleLogo width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.RussiaFlag width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.EnglishFlag width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.PayPal width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Stripe width={width} height={height} fillType={fillType} theme={theme}/>
          <Icons.Paid width={width} height={height} fillType={fillType} theme={theme}/>
      </div>
      </div>
    )   
}
