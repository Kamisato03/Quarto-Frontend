import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const token = ref(null);
  const expiresIn = ref(null);
  const user = ref(null);

  const register = async (username, phone, email, password, repassword) => {
    try {
      const res = await api.post("/user/register", {
        name: username,
        phone,
        email,
        password,
        repassword,
      });

      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      user.value = res.data.user;
      sessionStorage.setItem("user", true);
      console.log(user);
      setTime();
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  const access = async (email, password) => {
    try {
      const res = await api.post("/user/login", {
        email,
        password,
      });
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      user.value = res.data.user;
      sessionStorage.setItem("user", true);
      setTime();
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  const logout = async () => {
    try {
      await api.get("/user/logout");
    } catch (error) {
      console.log(error);
    } finally {
      sessionStorage.removeItem("user");
      resetStore();
    }
  };

  const setTime = () => {
    setTimeout(() => {
      refreshToken();
    }, expiresIn.value * 1000 - 6000);
  };

  const refreshToken = async () => {
    try {
      const res = await api.get("/user/refresh");
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      user.value = res.data.user;
      sessionStorage.setItem("user", true);
      setTime();
    } catch (error) {
      sessionStorage.removeItem("user");
      console.log(error);
    }
  };

  const resetStore = () => {
    token.value = null;
    expiresIn.value = null;
    user.value = null;
    localStorage.clear();
  };

  const updateUser = async (userUpdate) => {
    try {
      const formData = new FormData();
      formData.append("username", userUpdate.username);
      formData.append("phone", userUpdate.phone);
      formData.append("email", user.value.email);
      formData.append("password", user.value.password);
      formData.append("image", userUpdate.image);

      const res = await api({
        url: "/user/" + user.value._id,
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token.value,
        },
        data: formData,
      });

      user.value = res.data.user;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  return {
    token,
    expiresIn,
    user,
    refreshToken,
    register,
    access,
    logout,
    updateUser,
  };
});
