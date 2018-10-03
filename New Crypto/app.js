// Set up queryURL for AAPL stock information

let validationList = []
const stockList= ['AMZN', 'GOOG', 'TSLA', 'EDIT','LGND','EXEL'];
//const symbol = 'AAPL';

const displayStockInfo = function () {
    const stock = $(this).attr('data-name');
    const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news&range=1m&last=1`;

    $.ajax({
        url:queryURL,
        method: 'GET'
    }).then(function(response){
// Where is this <div> for the stockDiv located?
        const stockDiv= $('<div>').addClass('stock');

        const companyName = response.quote.companyName;
        const nameHolder = $('<p>').text(`Company Name: ${companyName}`);

        stockDiv.append(nameHolder);

        const stockSymbol = response.quote.symbol;
        const symbolHolder = $('<p>').text(`Stock Symbol: ${stockSymbol}`);

        stockDiv.append(symbolHolder);

        const stockPrice = response.quote.latestPrice;
        const priceHolder = $('<p>').text(`Stock Price: ${stockPrice}`);

        stockDiv.append(priceHolder);

        const companyNews = response.news[0].summary;
        const summaryHolder = $('<p>').text(`Headline News: ${companyNews}`);
        stockDiv.append(summaryHolder);

        $('#stock-view').append(stockDiv);
    })
}

const render = function (){
    $('#button-view').empty();

    for( let i = 0; i < stockList.length; i++){

        const newButton = $('<button>');
        newButton.addClass('stock-btn btn');
        newButton.attr('data-name', stockList[i])
        newButton.text(stockList[i]);

        $('#button-view').append(newButton);

    }
}

const addButton = function(event){
    event.preventDefault();

    const stock = $('#stock-input').val().trim();
    stockList.push(stock);

    $('#stock-input').val('');
    render();
}





;


const validation = function(){

    $.ajax({
        url:`https://api.iextrading.com/1.0/ref-data/symbols`,
        method:'GET'
    }).then(function(response){
        for(let i = 0; i < response.length; i++){
           validationList.push(response[i].symbol);
        }
        
    })
}




$('#add-stock').on('click', addButton);

$('#button-view').on('click', '.stock-btn', displayStockInfo);

render();
validation();