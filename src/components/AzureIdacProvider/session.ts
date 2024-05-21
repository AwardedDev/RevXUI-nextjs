export async function session({ session, token }) {
  session.error = token.error;
  session.user = token.user;
  session.idToken = token.account.id_token;
  session.signOutUrl = token.signOutUrl;

  return session;
}
