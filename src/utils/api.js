import axios from "axios";

export default {
    getCityNames: (name, setCityNames) => {
        return axios
            .get(`/routes/cities?name=${name}`)
            .then((response) => {
                setCityNames(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },
};