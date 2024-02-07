export class api {
  static serverURL: string =
    /* 'https://inctagram-back.vercel.app/api/v1' */ 'https://deepwaterhorizon.ru/api/v1'
  static clientUrl = 'https://inctagram-front.vercel.app/'

  //GITHUB CONFIGS
  static gitHubURL: string = `https://github.com`
  static clientGitId: string = '52f747905128092efbce'
  static gitAuth: string = this.gitHubURL + '/login/oauth/authorize?client_id='
  static gitHubScope: string = `&scope=read:user,user:email`
  //GOOGLE CONFIGS
  static googleURL: string = `https://accounts.google.com`
  static clientGoogleId: string =
    '621596965505-n57cqu1ifnmd34rqls715cao17t8r8n5.apps.googleusercontent.com'
  static googleAuth: string = this.googleURL + '/o/oauth2/v2/auth?response_type=code&client_id='
  static redirUrl = `&redirect_uri=${this.clientUrl}/home`
  static googleScope = '&scope=email profile'
}
