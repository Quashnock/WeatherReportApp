import React, {useState, useEffect} from 'react'

function DigitalClock(){

    const [time,setTime] = useState(new Date());

    useEffect(()=> {
        const intervalId = setInterval(()=>{
            setTime(new Date());
        },1000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);
    function formatTime(){
        const day = time.getDate();
        const month = time.toLocaleString('default', {month : 'long'});
        const year = time.getFullYear();

        let hours = time.getHours();
        const minutes = time.getMinutes();
        const signifier = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12 || 12;

        
        return (day + ' ' + month + ' ' + year + ' | ' + hours + ' : ' + (minutes<10 ? '0' + minutes : minutes)  + ' ' + signifier);
    }

    return(
    <span>{formatTime()}</span>
    );
};

export default DigitalClock;