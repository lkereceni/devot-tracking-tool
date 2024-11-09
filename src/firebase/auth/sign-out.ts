import { auth } from ".";

export default async function signOut() {
  try {
    auth.signOut();
  } catch (e) {
    console.log(e);
  }
}
