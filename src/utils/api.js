import axios from "axios";

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

    getRoutes: (from_city_id, to_city_id, setResults) => {
        return axios
            .get(`/routes?from_city_id=${from_city_id}&to_city_id=${to_city_id}`)
            .then((response) => {
                setResults(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },
};