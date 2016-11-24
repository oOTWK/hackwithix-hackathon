var stringThatisCSV;
var json;
initialize()

function initialize(){
    var address = 'http://localhost:8000/servers';
    fetch(address)
        .then(function (response) {
            return response.json();
            //The promise's return. Need to take out later
        }).then(function (json) {
        //Call function that you want to use the JSON File with
            handler(json);
    }).catch(function (ex) {
        console.log('parsing failed', ex)
    })
}


function handler(jsonObject){
    var theArray = jsonObject.data
    var initialdcValue = theArray[0].dc
    $('#theTable').bootstrapTable({
        data: jsonObject.data});/*(jsonObject.data).stringify(eval(( + str + ))))*/

    json = jsonObject;
    stringThatisCSV = "id,value\nserver" + "\n" + "server." + initialdcValue;
    for(var index in theArray)
    {
        if(theArray[index].dc != initialdcValue)
        {
            stringThatisCSV = stringThatisCSV + "\n" + "server." + theArray[index].dc;
            initialdcValue = theArray[index].dc
        }
        stringThatisCSV = stringThatisCSV + "\n" + "server." + theArray[index].dc + "." + theArray[index].id;

    }


    console.log(stringThatisCSV);
}
