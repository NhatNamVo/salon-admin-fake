import {callApi} from '@/config/http';

const clientApis = {
    getAllClient: (url, payload) => {
        return callApi(url, payload, 'POST')
    }
}

export default clientApis;