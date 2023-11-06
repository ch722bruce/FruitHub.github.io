const API = {
    login: async (input) => {
      try {
        const res = await fetch("/login", {
          method: "post",
          body: JSON.stringify(input),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const loginRes = await res.json();
        return loginRes;
      } catch (e) {
        console.log(e);
      }
    },
  
    register: async (input) => {
      try {
        const res = await fetch("/register", {
          method: "post",
          body: JSON.stringify(input),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const registerRes = await res.json();
        return registerRes;
      } catch (e) {
        console.log(e);
      }
    },
  
    updateProfile: async (input) => {
      try {
        // console.log(" API input", input);
        const res = await fetch("/updateUserInfo", {
          method: "post",
          body: JSON.stringify(input),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const updateRes = await res.json();
        console.log("updateProfile API get", updateRes);
        return updateRes;
      } catch (e) {
        console.log(e);
      }
    },
  
    logout: async () => {
      try {
        const res = await fetch("/logout", {
          method: "get",
        });
        console.log("User logout");
      } catch (e) {
        console.log(e);
      }
    },
  
    getUser: async () => {
      try {
        const res = await fetch("/getUser", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const userInfo = await res.json();
        // console.log("User get in API2", userInfo);
        return userInfo;
      } catch (e) {
        console.log(e);
      }
    },
  
    deleteUser: async () => {
      try {
        const res = await fetch("/deleteUser", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const deleteRes = await res.json();
        console.log("Res get in API", deleteRes);
        return deleteRes;
      } catch (e) {
        console.log(e);
      }
    },
  
    getCourses: async () => {
      try {
        const res = await fetch("/getCourses", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        // console.log(data);
        return data;
      } catch (e) {
        console.log(e);
      }
    },
  };
  
  export default API;