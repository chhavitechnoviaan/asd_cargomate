import {getSession} from "./auth";

const getBase = () => {
  const raw = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/$/, "");
  return raw.endsWith("/api") ? raw : `${raw}/api`;
};

export async function accountRequest(path,method="GET",body){
  const token=getSession()?.token;
  if(!token)throw Error("Please log in again");
  const res=await fetch(`${getBase()}/profile${path}`,{
    method,
    headers:{Authorization:`Bearer ${token}`,...(body?{"Content-Type":"application/json"}:{})},
    ...(body?{body:JSON.stringify(body)}:{})
  });
  const json=await res.json().catch(()=>({}));
  if(!res.ok||json.status===0)throw Error(json.message||"Request failed");
  return json.data;
}

export async function reportRequest(path="",method="GET",body){
  const token=getSession()?.token;
  if(!token)throw Error("Please log in again");
  const res=await fetch(`${getBase()}/reports${path}`,{
    method,
    headers:{Authorization:`Bearer ${token}`,...(body?{"Content-Type":"application/json"}:{})},
    ...(body?{body:JSON.stringify(body)}:{})
  });
  const json=await res.json().catch(()=>({}));
  if(!res.ok||json.status===0)throw Error(json.message||"Report request failed");
  return json.data;
}
