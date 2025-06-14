export default function AuthUser(req) {
  try {
    const userID = req.headers.get('user-id') || 'default_user_id';
    return { userID };
  } catch (e) {
    return { userID: 'default_user_id' };
  }
}