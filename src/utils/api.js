import axios from "axios";
import moment from "moment";

export default {
  getCityNames: (name, setCityNames) => {
    return axios
      .get(`/routes/cities?name=${name}`)
      .then((response) => {
        // console.log(response);
        setCityNames(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getRoutes: (info, setResults, setIsLoading) => {
    let a = `from_city_id=${info.from_city_id}`,
      b = `&to_city_id=${info.to_city_id}`,
      c =
        info.date_start !== ""
          ? `&date_start=${moment.utc(info.date_start).format("YYYY-MM-DD")}`
          : "",
      d =
        info.date_end !== ""
          ? `&date_end=${moment.utc(info.date_end).format("YYYY-MM-DD")}`
          : "",
      e = `&start_departure_hour_from=${info.start_departure_hour_from}`,
      f = `&start_departure_hour_to=${info.start_departure_hour_to}`,
      g = `&start_arrival_hour_from=${info.start_arrival_hour_from}`,
      h = `&start_arrival_hour_to=${info.start_arrival_hour_to}`,
      i = `&end_departure_hour_from=${info.end_departure_hour_from}`,
      j = `&end_departure_hour_to=${info.end_departure_hour_to}`,
      k = `&end_arrival_hour_from=${info.end_arrival_hour_from}`,
      l = `&end_arrival_hour_to=${info.end_arrival_hour_to}`,
      m =
        info.have_first_class !== false
          ? `&have_first_class=${info.have_first_class}`
          : "",
      n =
        info.have_second_class !== false
          ? `&have_second_class=${info.have_second_class}`
          : "",
      o =
        info.have_third_class !== false
          ? `&have_third_class=${info.have_third_class}`
          : "",
      p =
        info.have_fourth_class !== false
          ? `&have_fourth_class=${info.have_fourth_class}`
          : "",
      q = info.have_wifi !== false ? `&have_wifi=${info.have_wifi}` : "",
      r =
        info.have_express !== false ? `&have_express=${info.have_express}` : "",
      s = `&price_from=${info.price_from}`,
      t = `&price_to=${info.price_to}`,
      u = `&limit=${info.limit}`,
      v = `&sort=${info.sort}`,
      w = `&offset=${info.offset}`;

    setIsLoading(true);

    return axios
      .get(
        `/routes?${a}${b}${c}${d}${e}${f}${g}${h}${i}${j}${k}${l}${m}${n}${o}${p}${q}${r}${s}${t}${u}${v}${w}`
      )
      .then((response) => {
        setResults(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  },
};
