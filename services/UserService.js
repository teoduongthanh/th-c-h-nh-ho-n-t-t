import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(
    // https://backend-daily-m7gs-v2.onrender.com/api
    `https://backend-daily-m7gs-v2.onrender.com/api/user/loggin-user`,
    data
    ,{
      // tự động lấy cookie của người dùng và truyền xuống backend
      withCredentials: true,
    }
  );
  return res.data;
};

export const signupUser = async (data) => {
  const res = await axios.post(
    `https://backend-daily-m7gs-v2.onrender.com/api/user/sign-up`,
    data
  );
  return res.data;
};

export const sendVerifyCode = async (data) => {
  const res = await axios.post(
    `https://backend-daily-m7gs-v2.onrender.com/api/user/send-verification`,
    {
      data
    }
  );
  return res.data;
};


export const getDetaisUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `https://backend-daily-m7gs-v2.onrender.com/api/user/get-detail-user/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};


export const refreshToken = async () => {
  const cookies = document.cookie;

  const res = await axios.post(
    `https://backend-daily-m7gs-v2.onrender.com/api/user/refresh-token`,null,
    {
      // tự động lấy cookie của người dùng và truyền xuống backend
      withCredentials: true,
    }
  );
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(
    `https://backend-daily-m7gs-v2.onrender.com/api/user/logout-user`
  );
  return res.data;
};

export const updateUser = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `https://backend-daily-m7gs-v2.onrender.com/api/user/update-user/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllUser = async (access_token) => {
  const res = await axiosJWT.get(
    `https://backend-daily-m7gs-v2.onrender.com/api/user/getall-user/`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteUser = async (id,access_token) => {
  const res = await axiosJWT.delete(
    `https://backend-daily-m7gs-v2.onrender.com/api/user/delete-user/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};


export const deleteManyUser = async (data,access_token) => {
  const res = await axiosJWT.post(
    `https://backend-daily-m7gs-v2.onrender.com/api/user/delete-many-user`, data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const loginUserGoogle = async (data) => {
  const res = await axios.post(
    `https://backend-daily-m7gs-v2.onrender.com/api/user/auth/google`,
    data
    ,{
      // tự động lấy cookie của người dùng và truyền xuống backend
      withCredentials: true,
    }
  );
  
  return res.data;
};

export const sentTokenResetPassword = async (data) => {
  const res = await axios.post(
    `https://backend-daily-m7gs-v2.onrender.com/api/user/request-password-reset`,
    data
  )
  
  return res.data;
}


export const resetPassword = async (token, data) => {
  const res = await axios.post(
    `https://backend-daily-m7gs-v2.onrender.com/api/user/reset-password/${token}`,
    {
      data,
    }
  );
  return res.data;
};