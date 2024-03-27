import { useState,useEffect } from "react";

function fetchData(url) {

    const [loaded,setLoad] = useState(false)
    const [isError,setError] = useState(null)
    const [data,setData] = useState(null)


    useEffect(()=>{
        let controller = new AbortController();
        let signal = controller.signal;
        const load = async ()=>{
            let req = new Request(url,{method:"GET"})

            let loadingData = await fetch(req,{signal:signal}).then(rep =>{
                if (!rep.ok) {
                    setError(rep.statusText);
                    throw new Error("something want wrong: "+rep.status);
                }
                return rep.json();
            }).catch((e)=>{console.error(e.message)});
            // console.log(loadingData)
           setData(loadingData);
           setLoad(true) 

    }

    load();

    return ()=>{
        controller.abort();
    }
    },[])


    return [loaded,isError,data]

}

export default fetchData;