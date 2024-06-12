import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { setError, userUID } from "./actions";

export const signUpUser = () => async (dispatch, getState) => {
  const { email, password, confirmedPassword, name } = getState();

  if (password !== confirmedPassword) {
    dispatch(setError("Passwords do not match"));
    return;
  }

  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const db = getDatabase();
    await set(ref(db, "users/" + user.uid), {
      name: name,
      email: email,
    });
    dispatch(userUID(user.uid));
  } catch (error) {
    console.error(error);
    dispatch(setError(error.message));
  }
};
