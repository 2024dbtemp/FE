import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const putCatagory = async (categoryName) => {
  try {
    const response = await instance.put(
      `/admin/categories/${categoryName}`,
      categoryName
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      alert(error.response.data.message);
    }
    console.log(error);
    throw error;
  }
};

const deleteCategory = async (categoryName) => {
  try {
    const response = await instance.delete(
      `/admin/categories/${categoryName}`,
      categoryName
    );
    if (response.status === 200) {
      alert("카테고리 제거가 완료되었습니다.");
      return response.data;
    }
  } catch (error) {
    if (error.response.status === 404) {
      alert(error.response.data.message);
    }
    console.log(error);
    throw error;
  }
};

const addCategory = async (categoryName) => {
  try {
    const response = await instance.post(`/admin/categories`, categoryName);
    if (response.status === 200) {
      alert("카테고리 추가가 완료되었습니다.");
      return response.data;
    }
  } catch (error) {
    if (error.response.status === 403 || error.response.status === 404) {
      alert(error.response.data.message);
    }
    console.log(error);
    throw error;
  }
};

const putFood = async (foodName) => {
  try {
    const response = await instance.put(`/admin/foods/${foodName}`, foodName);
    if (response.status === 200) {
      alert("메뉴 수정이 완료되었습니다.");
      return response.data;
    }
  } catch (error) {
    if (error.response.status === 403 || error.response.status === 404) {
      alert(error.response.data.message);
    }
    console.log(error);
    throw error;
  }
};

const deleteFood = async (foodName) => {
  try {
    const response = await instance.delete(
      `/admin/foods/${foodName}`,
      foodName
    );
    if (response.status === 200) {
      alert("메뉴 삭제가 완료되었습니다.");
      return response.data;
    }
  } catch (error) {
    if (error.response.status === 403 || error.response.status === 404) {
      alert(error.response.data.message);
    }
    console.log(error);
    throw error;
  }
};

const getFood = async () => {
  try {
    const response = await instance.get(`/admin/foods`);
    return response.data;
  } catch (error) {
    if (error.response.status === 403 || error.response.status === 404) {
      alert(error.response.data.message);
    }
    console.log(error);
    throw error;
  }
};

const postFood = async (foodInfo) => {
  try {
    const response = await instance.post(`/admin/foods`, foodInfo);
    if (response.status === 200) {
      alert("메뉴 추가가 완료되었습니다.");
      return response.data;
    }
  } catch (error) {
    if (error.response.status === 403 || error.response.status === 404) {
      alert(error.response.data.message);
    }
    console.log(error);
    throw error;
  }
};
