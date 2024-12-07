import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  email: '',
  phone:'',
  address:'',
  avatar:'',
  access_token: '',
  authType : 'local',
  inactiveDay :'',
  activeDay:"",
  totalDay :'',
  createdAt:'',
  updatedAt:"",
  authGoogleID :null,
  isLoading: false,
  isAdmin:false
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name ='', email='',activeDay='',phone='', address='', user_id='',createdAt='',updatedAt='',isAdmin,authType='',inactiveDay='',totalDay='',authGoogleID} = action.payload;
     
      const { access_token } = action.payload;
      
      // ngày tháng năm
      state.updatedAt = new Date(updatedAt).toLocaleDateString('vi-VN');
      state.activeDay = new Date(activeDay).toLocaleDateString('vi-VN');
      state.createdAt = new Date(createdAt).toLocaleDateString('vi-VN');
      state.inactiveDay =new Date(inactiveDay).toLocaleDateString('vi-VN');
      state.totalDay =new Date(totalDay).toLocaleDateString('vi-VN');

      state.name = name;
      state.authType = authType;
      state.authGoogleID = authGoogleID;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.id = user_id
      state.access_token = access_token;
      state.isAdmin = isAdmin;
    },
    resetUser: (state) => {
      state.authType = '';
      state.inactiveDay = '';
      state.totalDay = '';
      state.authGoogleID = '';
      state.email = '';
      state.phone = '';
      state.address = '';
      state.id = ''
      state.access_token = '';
      state.isAdmin = '';
    },
  },
});

export const { updateUser ,resetUser} = userSlice.actions

export default userSlice.reducer
 