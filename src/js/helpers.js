// helpers file is for functions that we use over and over again 

export const getJSON = async function(url) {
    try {
        // res is going to return a promise 
        const res = await fetch(url);
        
        // .json() is going to return another promise 
        const data = await res.json();
        console.log(res, data);
        
        //  data that is the result value of the promise getJSON returns 
        return data;

        if(!res.ok) throw new Error(`${data.message} (${res.status})`);
    } catch (err) {
        console.log(err)
    }
}

