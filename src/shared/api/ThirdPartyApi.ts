export class api {
  static serverURL: string = 'https://deepwaterhorizon.ru/api/v1'
  static clientUrl = 'https://inctagram-front.vercel.app/'

  //GITHUB CONFIGS
  static gitHubURL: string = `https://github.com`
  static clientGitId: string = '52f747905128092efbce' /* 'b4ff3618c27e31dfa252' */
  static gitAuth: string = this.gitHubURL + '/login/oauth/authorize?client_id='
  static gitHubScope: string = `&scope=read:user`
  //GOOGLE CONFIGS
  static googleURL: string = `https://accounts.google.com`
  static clientGoogleId: string =
    '621596965505-n57cqu1ifnmd34rqls715cao17t8r8n5.apps.googleusercontent.com'
  static googleAuth: string = this.googleURL + '/o/oauth2/v2/auth?response_type=code&client_id='
  static redirUrl = '&redirect_uri='
  static googleScope = '&scope=email profile'
}
