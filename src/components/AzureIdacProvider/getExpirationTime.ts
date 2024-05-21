function getExpirationTime(token) {
  return token.account.not_before + token.account.id_token_expires_in;
}

export default function isTokenValid(token) {
  const expiredAt = getExpirationTime(token);

  const oneMinute = 60;
  const nowInSeconds = new Date().getTime() / 1000;
  const timeToRefresh = nowInSeconds + oneMinute;

  return expiredAt > timeToRefresh;
}
