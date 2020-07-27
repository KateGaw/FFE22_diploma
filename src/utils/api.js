import axios from "axios";

export default {
  getCatalogItems: (id, setCatalog, setIsLoading) => {
    return axios
      .get(id === 0 ? `/items` : `/items?categoryId=${id}`)
      .then((response) => {
        setCatalog(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  },

  getMoreItems: (
    id,
    itemsCounter,
    setButtonVisible,
    setButtonClick,
    setNewItems,
    setItemsCounter
  ) => {
    return axios
      .get(
        id === 0
          ? `/items?offset=${itemsCounter}`
          : `/items?categoryId=${id}&offset=${itemsCounter}`
      )
      .then((response) => {
        if (response.data.length === 0) {
          setButtonVisible(false);
          setButtonClick(false);
        } else {
          setButtonClick(false);
          setNewItems(response.data);
          setItemsCounter((i) => i + 6);
        }
      });
  },

  getMoreItemsFilter: (
    id,
    itemsCounter,
    setButtonVisible,
    setButtonClick,
    setNewItems,
    setItemsCounter,
    searchText
  ) => {
    return axios
      .get(
        id === 0
          ? `/items?offset=${itemsCounter}&q=${searchText}`
          : `/items?categoryId=${id}&offset=${itemsCounter}&q=${searchText}`
      )
      .then((response) => {
        console.log(response);
        if (response.data.length === 0) {
          //если данных нет, то скрываем кнопку
          setButtonVisible(false);
          setButtonClick(false);
        } else {
          setButtonClick(false);
          setNewItems(response.data);
          setItemsCounter((i) => i + 6);
        }
      });
  },
  getSearchResult: (id, inputValue, setFindItems) => {
    return axios
      .get(
        id === 0
          ? `/items?q=${inputValue}`
          : `/items?categoryId=${id}&q=${inputValue}`
      )
      .then((response) => {
        setFindItems(response.data);
      });
  },
  getCatalogCategories: (setCategories, setIsLoading) => {
    return axios
      .get(`/categories`)
      .then((response) => {
        setCategories(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  },
  getTopSales: (setSales, setIsLoading) => {
    return axios
      .get(`/top-sales`)
      .then((response) => {
        setSales(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  },
  getItemAllInfo: (itemId, setItem, setIsLoading) => {
    return axios
      .get(`/items/${itemId}`)
      .then((response) => {
        setItem(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  },
  getOrder: (output, setResult) => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    };
    return axios
      .post(`/order`, JSON.stringify(output), { headers })
      .then((response) => {
        setResult(response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
