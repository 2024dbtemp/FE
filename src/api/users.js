import axios from "axios";

//사용자 모드를 위한 api

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
// 사용자가 입력한 고객번호, 이름, 전화번호, 비밀번호를 api에 보내원 고객을 추가
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
//서버에 로그인한 사용자의 정보를 보낸 후, 토큰을 받아오는 형식.
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

//카테고리 가져오기
// 서버에서 데이터베이스 상의 카테고리 가져옴
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

//메뉴 가져오기
// 서버에서 메뉴 아이템을 가져오는데, 이때 음식명, 최소/최대 가격, 카테고리를 파라미터로 보내
//사용자가 원하는 메뉴를 필터링해서 볼 수 있도록 함
export const getFood = async (name, minPrice, maxPrice, category) => {
  try {
    const params = {
      name: name || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    };

    if (category) {
      params.categories = category;
    }

    const response = await instance.get("/foods", { params });
    return response.data;
  } catch (error) {
    console.log("에러", error);
    throw error;
  }
};

//음식명을 통한 메뉴 가져오기
//음식명을 파라미터로 보내 서버에서 해당 이름을 가진 메뉴의 정보만을 가져옴
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

//주문내역 가져오기
//사용자가 기간을 설정했다면, 설정한 기간에 주문한 내역만을 가져옴
export const getOrders = async ({ startDate, endDate }) => {
  try {
    const response = await instance.get("/orders", {
      params: {
        startDate: startDate ? `${startDate}:00` : undefined,
        endDate: endDate ? `${endDate}:59` : undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//장바구니 내역을 주문내역으로 올림
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

//주문 상세 내역을 보기 위해 장바구니 Id를 이용해서 해당 Id에 해당하는 주문내역만을 가져옴
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

//사용자의 장바구니 내역을 가져오가 위한 부분.
export const getCart = async () => {
  try {
    const response = await instance.get(`/carts`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//사용자 장바구니에서 메뉴의 수량을 변경할 시에 변경되어 장바구니 내역에 올라가도록 함.
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

//사용자가 선택한 메뉴의 정보를 서버에 보내 장바구니 내역에 올림.
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

//장바구니에서 사용자가 메뉴를 삭제했을 경우 삭제한 메뉴명을 서버에 보내 장바구니 내역에서 해당 메뉴를 지움.
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
