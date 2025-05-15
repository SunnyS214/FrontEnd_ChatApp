export const baseURL="http://localhost:3000/api"



 export const postReq= async(url, body)=>{
const response=await fetch(url, {
    method:'POST',
    headers:{
        "Content-Type":"application/json"
    },
    body: JSON.stringify(body),
     credentials: "include"
})
const data= await response.json()

if (!response.ok){
    let message
    if(data?.message ){
        message=data.message
    }else{
        message=data
    }
    return {error:true , message}
}

return data
 }


 
 export const getReq = async (url)=>{
 const response = await fetch(url)

 const data= await response.json()

if(!response.ok){
    let message ='An Error occured... '
    if(data ?.message){

        message=data.message
    }
    return {error : true , message}
}
return data

 }