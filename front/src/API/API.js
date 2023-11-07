const API = {
  signIn: async (input) => {
      try {
        const res = await fetch("api/signIn", {
          method: "POST",
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
  
    signUp: async (input) => {
      try {
        const res = await fetch("/api/signUp", {
          method: "post",
          body: JSON.stringify(input),
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        // Check if the response was successful
        if (!res.ok) {
          // You can create a new error object and return or throw it
          const err = new Error(`HTTP error! status: ${res.status}`);
          err.response = res;
          throw err;
        }
    
        const registerRes = await res.json();
        return registerRes;
    
      } catch (e) {
        // Return an error object with the message and any other details
        console.error(e);
        // If the response is available and has a status, we include it in the error
        if (e.response && e.response.status === 404) {
          return { error: true, message: "Endpoint not found." };
        } else {
          return { error: true, message: e.message || "An error occurred during registration." };
        }
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
  
    signOut: async () => {
      try {
        const res = await fetch("/signOut", {
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
  
    
  };
  
  export default API;