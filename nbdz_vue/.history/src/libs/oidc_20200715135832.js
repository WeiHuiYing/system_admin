export const oidcSettings = {
  "authority": "http://localhost:5000",
  "clientId": "js",
  "redirectUri": "http://localhost:8080/oidc-callback",
  "responseType": "code",
  "scope": "openid profile vue.api",
  "automaticSilentRenew": true,
  "silentRedirectUri": "http://localhost:8080/silent-renew-oidc.html"
}
