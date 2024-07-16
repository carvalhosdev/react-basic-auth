import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootSate } from "../store";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '',
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootSate).auth.token
            if(token){
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({})
})

export default api;
