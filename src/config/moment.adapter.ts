// import moment from "moment";
import moment from 'moment-timezone';


export class DateAdapter {

    constructor(
        private readonly timeZone: string = 'America/Mexico_City'
    ){}

    public getActualDate(){
        const actualDate = moment().tz(this.timeZone).format('YYYY-MM-DD');
        return actualDate;
    }
}