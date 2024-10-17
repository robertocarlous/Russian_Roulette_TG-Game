/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient, baseUrl } from "./Controller"

export const userAuth =async(data:any)=>{
    try{
       const response = await apiClient.post(baseUrl, data)
       return response
    }
    catch(error:any){
        throw new Error (error )
    }
}