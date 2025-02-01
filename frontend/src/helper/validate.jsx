import toast from "react-hot-toast";
import { authenticate } from "./helper";

/** validate login page username */
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  if (values.name) {
    // check user exist or not
    const { status } = await authenticate(values.name);

    if (status !== 200) {
      errors.exist = toast.error("User does not exist...!");
    }
  }

  return errors;
}

/** validate password */
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);

  return errors;
}

/** validate reset password */
export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);
  confirmPasswordVerify(errors, values);

  if (values.password !== values.password2) {
    errors.exist = toast.error("Password not match...!");
  }

  return errors;
}

/** validate register form */
export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  confirmPasswordVerify(errors, values);
  passwordVerify(errors, values);
  addressVerify(errors, values);
  phoneVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

/** validate profile page */
export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}

/** ************************************************* */

/** validate password */
function passwordVerify(errors = {}, values) {
  /* eslint-disable no-useless-escape */
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    errors.password = toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Wrong Password...!");
  } else if (values.password.length < 4) {
    errors.password = toast.error(
      "Password must be more than 4 characters long"
    );
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error("Password must have special character");
  }

  return errors;
}

/** validate username */

function usernameVerify(error = {}, values) {
  if (!values.name) {
    error.name = toast.error("Username Required...!");
  } else if (values.name.trim() !== values.name) {
    error.name = toast.error("Username cannot start or end with spaces...!");
  } else {
    for (let char of values.name) {
      if (
        !(char >= "A" && char <= "Z") &&
        !(char >= "a" && char <= "z") &&
        char !== " "
      ) {
        error.name = toast.error(
          "Username can only contain letters and spaces...!"
        );
        break;
      }
    }
    const words = values.name.split(" ").filter((word) => word);
    if (words.length > 2) {
      error.name = toast.error("Username must be first and last name only...!");
    }
  }

  return error;
}

/** validate email */
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address...!");
  }

  return error;
}


/** validate Address */

function addressVerify(error = {}, values) {
  if (!values.address) {
    error.address = toast.error("Address Required...!");
  } else if (values.address.includes(" ")) {
    error.address = toast.error("Invalid Address...!");
  }

  return error;
}

/** validate Phone No */

function phoneVerify(error = {}, values) {
  if (!values.phone_no) {
    error.phone_no = toast.error("Phone No. Required...!");
  } else if (values.phone_no.includes(" ")) {
    error.phone_no = toast.error("Invalid Address...!");
  }

  return error;
}

/** validate Confirm Password */

function confirmPasswordVerify(errors = {}, values) {
  if (!values.password2) {
    errors.password2 = toast.error("Confirm Password Required...!");
  } else if (values.password !== values.password2) {
    errors.password2 = toast.error("Passwords do not match!");
  }

  return errors;
}

/** validate login form */
export async function loginValidation(values) {
  const errors = passwordVerify({}, values);
  emailVerify(errors, values);
  return errors;
}
