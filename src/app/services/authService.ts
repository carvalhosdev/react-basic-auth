import { setCredentials } from "../../features/auth/authSlice";
import { api } from "./apiService";

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

export const authApi =  api.injectEndpoints({
    endpoints: builder => ({
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