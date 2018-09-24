import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:5000/api",
  withCredentials: true
});

const errHandler = err => {
  console.error(err);
  throw err;
};

export default {
  service: service,

  postTrip(data) {
    return service
      .post("/trips/add", data)
      .then(res => res.data)
      .catch(errHandler);
  },

  deleteTrip(id) {
    return service
      .delete(`/trips/${id}`)
      .then(res => res.data)
      .catch(errHandler);
  },

  gettrips() {
    return service
      .get("/trips")
      .then(res => res.data)
      .catch(errHandler);
  },

  gettrip(id) {
    return service
      .get(`/trips/${id}`)
      .then(res => res.data)
      .catch(errHandler);
  },

  postActivity(id, data) {
    return service
      .post(`/activities/${id}`, data)
      .then(res => res.data)
      .catch(errHandler);
  },

  deleteActivity(id) {
    return service
      .delete(`/activities/${id}`)
      .then(res => res.data)
      .catch(errHandler);
  },

  getActivities(id) {
    return service
      .get(`/trips/${id}/activities`)
      .then(res => res.data)
      .catch(errHandler);
  },

  signup(userInfo) {
    return service
      .post("/signup", userInfo)
      .then(res => res.data)
      .catch(errHandler);
  },

  login(username, password) {
    return service
      .post("/login", {
        username,
        password
      })
      .then(res => {
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    localStorage.removeItem("user");
    return service.get("/logout").then(res => {});
  },

  // loadUser() {
  //   const userData = localStorage.getItem('user');
  //   if (!userData) return false;
  //   const user = JSON.parse(userData);
  //   if (user.token) {
  //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
  //     return user;
  //   }
  //   return false;
  // },

  isLoggedIn() {
    return localStorage.getItem("user") != null;
  },

  getProfile() {
    return service.get("/profile").then(res => res.data);
  },

  addPicture(file) {
    const formData = new FormData();
    formData.append("picture", file);
    return service
      .post("/users/first-user/pictures", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => res.data)
      .catch(errHandler);
  },

  addProfilePicture(file) {
    const formData = new FormData();
    formData.append("picture", file);
    return service
      .patch("/profile/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => res.data)
      .catch(errHandler);
  }
};
