import { useState } from "react";
import {
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../../services/authService";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const sendOtp = async (email) => {
    try {
      setLoading(true);
      const res = await forgotPassword(email);
      return res;
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpCode = async (email, otp) => {
    try {
      setLoading(true);
      const res = await verifyOtp(email, otp);
      return res;
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (resetToken, newPassword) => {
    try {
      setLoading(true);
      const res = await resetPassword(resetToken, newPassword);
      return res;
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    sendOtp,
    verifyOtpCode,
    changePassword,
  };
};