export class api {
  static serverURL: string =
    /* 'https://inctagram-back.vercel.app/api/v1' */ 'https://deepwaterhorizon.ru/api/v1'
  static clientUrl =
    /* `http://localhost:3000/auth/sign-in/` */ 'https://inctagram-front.vercel.app/auth/sign-in/'

  //GITHUB CONFIGURATION
  static clientGitId: string = 'a4a56be1a1716484d5ea'
  static gitPath: string = `https://github.com/login/oauth/authorize?client_id=${this.clientGitId}&scope=read:user,user:email`
  //GOOGLE CONFIGURATION
  static redirectGoogleURL = `https://inctagram-front.vercel.app/auth/sign-in`
  static clientGoogleId: string =
    '621596965505-n57cqu1ifnmd34rqls715cao17t8r8n5.apps.googleusercontent.com'
  static googlePath = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${this.clientGoogleId}&redirect_uri=${this.redirectGoogleURL}&scope=email profile`
}
