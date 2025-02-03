import axios from "axios";
import * as jwt_decode from "jwt-decode";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

/** Make API Requests */

/** To get username from Token */
export async function getUsername() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Cannot find Token");
  let decode = jwt_decode(token);
  return decode;
}

/** authenticate function */
export async function authenticate(username) {
  try {
    return await axios.post("/user/authenticate", { username });
  } catch (error) {
    return { error: "Username doesn't exist...!" };
  }
}



/** register user function */

export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`/user/register/`, credentials);

    return Promise.resolve(msg);
  } catch (error) {
    const errorMsg = error.response?.data?.errors;
    const message = errorMsg
      ? Object.values(errorMsg).flat().join(", ")
      : "Something went wrong";

    return Promise.reject(message);
  }
}


/** login user function */

export async function loginUser(credentials) {
  try {
    const { data, status } = await axios.post("/user/login/", credentials);

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject({
      error: error.response?.data || "Password doesn't match...!",
    });
  }
}



/** update user profile function */
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("accessToken");
    const data = await axios.put("/user/login/", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" });
  }
}


/** change password function */
export async function changePassword(credentials) {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return Promise.reject({
        error: "Authentication token not found.",
      });
    }

    const { data, status } = await axios.post(
      "/user/changepassword/",
      credentials,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject({
      error: error.response?.data || "Password doesn't match...!",
    });
  }
}


/** send reset password link on mail function */
export const sendPassword = async ({ email }) => {
  try {
    const response = await axios.post(
      "/user/send-reset-password-email/",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { data, status } = response;
    return { data, status };
  } catch (error) {
    return Promise.reject({
      error:
        error.response?.data ||
        error.message ||
        "Failed to send password reset link.",
    });
  }
};

/** reset password function */

export const resetPassword = async (payload, token, prefix) => {
  try {
    const response = await axios.post(
      `/user/reset-password/${prefix}/${token}/`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { data, status } = response;
    return { data, status };
  } catch (error) {
    return Promise.reject({
      error:
        error.response?.data || error.message || "Failed to reset password.",
    });
  }
};


export async function submitForm(response) {
  try {
    const token = await localStorage.getItem("accessToken");
    const data = await axios.post("/warehouse/companies/", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" });
  }
}