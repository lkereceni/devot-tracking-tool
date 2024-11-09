import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from ".";

export default async function signUp(email: string, password: string) {
  let result = null;
  let error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
