// api/user.js
import API_INSTANCE from "./index";

export const loginUser = async (contact) => {
  try {
    const res = await API_INSTANCE.post("/user/login", { phone: contact });
    return res;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const singUpUser = async (phone) => {
  try {
    const res = await API_INSTANCE.post("/user/register", { phone });
    return res;
  } catch (error) {
    throw error;
  }
};

export const verifyUserOTP = async (phone, otpString) => {
  try {
    const res = await API_INSTANCE.post("/user/verify-otp", {
      phone,
      otp: otpString,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const verifyLoginOTP = async (phone, otp) => {
  try {
    const res = await API_INSTANCE.post("/user/verify-login-otp", {
      phone,
      otp
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = async () => {
  try {
    const res = await API_INSTANCE.get("/user/me");
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateUserDetails = async (details) => {
  try {
    const res = await API_INSTANCE.post("/user/basic-details", details);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateUserCategories = async (categories) => {
  try {
    const res = await API_INSTANCE.post("/user/categories", { categories });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getUserCategories = async () => {
  try {
    const res = await API_INSTANCE.get("/user/me");
    return res;
  } catch (error) {
    throw error;
  }
};


export const completeOnboarding = async (skipped = false) => {
  try {
    const res = await API_INSTANCE.post("/user/complete-onboarding", { skipped });
    return res;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await API_INSTANCE.post("/user/logout");
    return res;
  } catch (error) {
    throw error;
  }
};
