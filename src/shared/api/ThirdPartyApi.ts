export class api {
  static serverURL: string =
    /* 'https://inctagram-back.vercel.app/api/v1' */ 'https://deepwaterhorizon.ru/api/v1'
  static clientUrl = `http://localhost:3000/auth/sign-in/` /* 'https://inctagram-front.vercel.app/' */

  //GITHUB CONFIGS
  static gitHubURL: string = `https://github.com`
  static clientGitId: string = 'a4a56be1a1716484d5ea'
  static gitAuth: string = this.gitHubURL + '/login/oauth/authorize?client_id='
  static gitHubScope: string = `&scope=read:user,user:email`
  //GOOGLE CONFIGS
  static googleURL: string = `https://accounts.google.com`
  static clientGoogleId: string =
    '281099260073-6ieqpv37b5is6ovpe0tcfq3i5afiiqq7.apps.googleusercontent.com'
  static googleAuth: string = this.googleURL + '/o/oauth2/v2/auth?response_type=code&client_id='
  static redirUrl = '&redirect_uri='
  static googleScope = '&scope=email profile'
}
