const moment = require('moment');
module.exports = {
 CalRentPrice
};
 
function CalRentPrice (header) {
    let Start = new moment(header.StartDate);
    let End = new moment(header.EndDate);
    let diffdate = End.diff(Start, 'days');
    console.log(Start,End,diffdate);
    header.rentPrice  = header.initPrice * diffdate;
    
    if(diffdate > 3){
        header.FeePrice = 20 * (diffdate - 2);
    }
    header.isEnd = true;
    return header;
}