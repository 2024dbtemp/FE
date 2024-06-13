import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터를 통해 토큰을 모든 요청 헤더에 추가
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

// 응답 인터셉터에서 토큰 만료 처리
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (error.response.data.message === "Token expired") {
        alert("토큰이 만료되었습니다. 다시 로그인해 주세요.");
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// 사용자 추가
export const addUser = async (userInfo) => {
  try {
    const response = await instance.post("/customers", userInfo);
    if (response.status === 200) {
      alert("회원가입이 완료되었습니다.");
      console.log(userInfo);
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      alert(error.response.data);
    }
    console.log(error);
    throw error;
  }
};

// 사용자 인증
export const authUser = async (userInfo) => {
  try {
    const response = await instance.post("/customers/login", userInfo);
    const token = response.data.accessToken;
    localStorage.setItem("authToken", token);
    console.log(response.data);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 404 || error.response.status === 401)
    ) {
      alert(error.response.data.message);
    }
    console.log(error);
    throw error;
  }
};

// 카테고리 가져오기
export const getCategory = async () => {
  try {
    const response = await instance.get("/categories");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("카테고리 출력 실패", error);
    throw error;
  }
};

// 음식 목록 가져오기
export const getFood = async (name, minPrice, maxPrice, categories) => {
  try {
    const response = await instance.get("/foods", {
      params: {
        name: name || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        categories: categories.length > 0 ? categories : undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.log("에러", error);
    throw error;
  }
};
export const getFoodbyName = async (name) => {
  try {
    const response = await instance.get(`/foods`, {
      params: { name },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      alert(error.response.data.message);
    }
    console.log(error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await instance.get(`/orders`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postOrders = async () => {
  try {
    const response = await instance.post("/orders");
    if (response.status === 200) {
      alert("주문이 완료됐습니다.");
    }
    return response;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert(error.response.data.message);
    }
    console.log(error);
    throw error;
  }
};

export const getOrderbyId = async (cartId) => {
  try {
    const response = await instance.get(`/orders/${cartId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      alert(error.response.data.message);
    }
    console.log(error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await instance.get(`/carts`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const putCartAmount = async (foodInfo) => {
  try {
    const response = await instance.put(`/carts`, foodInfo);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      alert(error.response.data.message);
    }
    console.log(error);
    throw error;
  }
};

export const postCart = async (foodInfo) => {
  try {
    const response = await instance.post(`/carts`, foodInfo);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      alert(error.response.data.message);
    }
    console.log(error);
    throw error;
  }
};

export const deleteCart = async (foodName) => {
  try {
    const response = await instance.delete(`/carts`, { data: { foodName } });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      alert(error.response.data.message);
    }
    console.log(error);
    throw error;
  }
};
