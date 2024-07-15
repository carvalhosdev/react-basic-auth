import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootSate } from "../store";
import { setCredentials } from "../../features/auth/authSlice";

export interface User {
    username:string
}

export interface UserResponse{
    user: User,
    token: string
}

export interface LoginRequest{
    username:string,
    password:string
}


export const authApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootSate).auth.token
            if(token){
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        login: builder.mutation<UserResponse, LoginRequest>({
            query: (crendentials) => ({
                url: "/login",
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: crendentials,
            })
        }),
        getUserDetail: builder.mutation({
            query: () => ({
                url: '/auth/me',
                method:'GET',
                headers: {
                    "Content-Type" : "application/json"
                }
            }),
            async onQueryStarted(arg,  {dispatch, queryFulfilled}){
                try{
                    const {data} = await queryFulfilled
                    const {token} = data;
                    dispatch(setCredentials({token}))
                }catch(err){
                    console.error(err)
                }
            }
        })
    })
})

export const {useLoginMutation, useGetUserDetailMutation} = authApi;
