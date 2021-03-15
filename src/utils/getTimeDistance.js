import { format } from "date-fns";

export default function getTimeDistance(startedAt, stoppedAt){
    if(!stoppedAt){
        const currentDate = Date.now()
        const difference = currentDate - startedAt
        console.log(currentDate, startedAt);

    } else {
        console.log('else');
    }
}