import axios from "axios";

//관리자 모드를 위한 api

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

export const getTotalSales = async () => {
  try {
    const response = await instance.get("/admin/statistics/total-sales");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSalesPerMember = async () => {
  try {
    const response = await instance.get(
      "/admin/statistics/total-payments-per-member"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSalesByFood = async () => {
  try {
    const response = await instance.get(
      "/admin/statistics/total-sales-by-food"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// export const putCatagory = async (categoryName) => {
//   try {
//     const response = await instance.put(
//       `/admin/categories/${categoryName}`,
//       categoryName
//     );
//     return response.data;
//   } catch (error) {
//     if (error.response.status === 404) {
//       alert(error.response.data.message);
//     }
//     console.log(error);
//     throw error;
//   }
// };

// export const deleteCategory = async (categoryName) => {
//   try {
//     const response = await instance.delete(
//       `/admin/categories/${categoryName}`,
//       categoryName
//     );
//     if (response.status === 200) {
//       alert("카테고리 제거가 완료되었습니다.");
//       return response.data;
//     }
//   } catch (error) {
//     if (error.response.status === 404) {
//       alert(error.response.data.message);
//     }
//     console.log(error);
//     throw error;
//   }
// };

// export const addCategory = async (categoryName) => {
//   try {
//     const response = await instance.post(`/admin/categories`, categoryName);
//     if (response.status === 200) {
//       alert("카테고리 추가가 완료되었습니다.");
//       return response.data;
//     }
//   } catch (error) {
//     if (error.response.status === 403 || error.response.status === 404) {
//       alert(error.response.data.message);
//     }
//     console.log(error);
//     throw error;
//   }
// };

// export const putFood = async (foodName, foodData) => {
//   try {
//     const response = await instance.put(`/admin/foods/${foodName}`, foodData);
//     if (response.status === 200) {
//       alert("메뉴 수정이 완료되었습니다.");
//       return response.data;
//     }
//   } catch (error) {
//     if (error.response.status === 403 || error.response.status === 404) {
//       alert(error.response.data.message);
//     }
//     console.log(error);
//     throw error;
//   }
// };

// export const deleteFood = async (foodName) => {
//   try {
//     const response = await instance.delete(
//       `/admin/foods/${foodName}`,
//       foodName
//     );
//     if (response.status === 200) {
//       alert("메뉴 삭제가 완료되었습니다.");
//       return response.data;
//     }
//   } catch (error) {
//     if (error.response.status === 403 || error.response.status === 404) {
//       alert(error.response.data.message);
//     }
//     console.log(error);
//     throw error;
//   }
// };

// export const getFood = async (name, minPrice, maxPrice, category) => {
//   try {
//     const params = {
//       name: name || undefined,
//       minPrice: minPrice || undefined,
//       maxPrice: maxPrice || undefined,
//     };

//     if (category) {
//       params.categories = category;
//     }

//     const response = await instance.get("/foods", { params });
//     return response.data;
//   } catch (error) {
//     console.log("에러", error);
//     throw error;
//   }
// };

// export const postFood = async (foodInfo) => {
//   try {
//     const response = await instance.post(`/admin/foods`, foodInfo);
//     if (response.status === 200) {
//       alert("메뉴 추가가 완료되었습니다.");
//       return response.data;
//     }
//   } catch (error) {
//     if (error.response.status === 403 || error.response.status === 404) {
//       alert(error.response.data.message);
//     }
//     console.log(error);
//     throw error;
//   }
// };
