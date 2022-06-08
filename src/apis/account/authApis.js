import { callApi } from "@/config/http"

const authApis = {
    login: (url, payload) => {
        return callApi(url, payload);
    }
};

export default authApis;