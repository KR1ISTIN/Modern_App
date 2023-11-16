// helpers file is for functions that we use over and over again 


import {TIMEOUT_SEC} from './config.js'

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };
  

export const getJSON = async function(url) {
    try {
        const fetchPro = fetch(url);
        // res is going to return a promise - go back and review video helpers/config video 
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        
        // .json() is going to return another promise 
        const data = await res.json();
        console.log(res, data);
        
        //  data that is the result value of the promise getJSON returns 
        return data;

        if(!res.ok) throw new Error(`${data.message} (${res.status})`);
    } catch (err) {
        console.log(err);
    }
}

