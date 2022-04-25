async function main() {

    // TAKING DATA FROM TWELEDATA - Use at end
    //let stockLibary = await fetch("https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=2cbaacb8910e42809c2300b6404553bc")
    //let stockArray = stockLibary.json();

    // TAKING DATA FROM MOCK DATA - Use for testing (mockData defined in mockData.js)
    const { GME, MSFT, DIS, BNTX } = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];


    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    // get information from GME object
    // date information 
    const GMEdays = GME.values.map(data => data.datetime);
    // title of stock
    const GMElabel = GME.meta.symbol;
    // the high values for the stock on each day (change sting data to float - may want to do math)
    const GMEhigh = GME.values.map(data => parseFloat(data.high))

    // get information from MSFT object
    // date information 
    const MSFTdays = MSFT.values.map(data => data.datetime);
    // title of stock
    const MSFTlabel = MSFT.meta.symbol;
    // the high values for the stock on each day (change sting data to float - may want to do math)
    const MSFThigh = MSFT.values.map(data => parseFloat(data.high))

    // get information from DIS object
    // date information 
    const DISdays = DIS.values.map(data => data.datetime);
    // title of stock
    const DISlabel = DIS.meta.symbol;
    // the high values for the stock on each day (change sting data to float - may want to do math)
    const DIShigh = DIS.values.map(data => parseFloat(data.high))

    // get information from BNTX object
    // date information 
    const BNTXdays = BNTX.values.map(data => data.datetime);
    // title of stock
    const BNTXlabel = BNTX.meta.symbol;
    // the high values for the stock on each day (change sting data to float - may want to do math)
    const BNTXhigh = BNTX.values.map(data => parseFloat(data.high))

    // Function for defining color for each stock 
    let colorPicker = (stockSymbol) => {
        // checks to see the stock's name
        if (stockSymbol == "GME"){
            // returns rgba color value based on stock's name
            return "rgba(61, 161, 61, 0.7)"
        }

        if (stockSymbol == "MSFT"){
            return "rgba(209, 4, 25, 0.7)"
        }

        if (stockSymbol == "DIS"){
            return "rgba(18, 4, 209, 0.7)"
        }

        if (stockSymbol == "BNTX"){
            return "rgba(166, 43, 158, 0.7)"
        }
    }

    // function to find the highest value for a stock
    const highestStock = (stock) => {
        // create array of stock values
        let stockVals = stock.values.map(data => parseFloat(data.high))
        // find the highest value in the stock value array
        let highestValue = stockVals.reduce((a,b) => Math.max(a,b))
        // return the highest value
        return highestValue
    }


    // chart for GME
    new Chart(timeChartCanvas.getContext("2d"), {
        type: 'line',
        data: {
            // labels are the days (x axis) - reversed to go in ascending order
            labels: GMEdays.reverse(),
            datasets: [
                {
                    // stock's name
                    label: GMElabel,
                    // high for each day in reverse order to correspond to dates
                    data: GMEhigh.reverse(),
                    // set background and border color based on stock label
                    backgroundColor: colorPicker(GMElabel),
                    borderColor: colorPicker(GMElabel)
                },
                {
                    // stock's name
                    label: MSFTlabel,
                    // high for each day in reverse order to correspond to dates
                    data: MSFThigh.reverse(),
                    // set background and border color based on stock label
                    backgroundColor: colorPicker(MSFTlabel),
                    borderColor: colorPicker(MSFTlabel)
                },
                {
                    // stock's name
                    label: DISlabel,
                    // high for each day in reverse order to correspond to dates
                    data: DIShigh.reverse(),
                    // set background and border color based on stock label
                    backgroundColor: colorPicker(DISlabel),
                    borderColor: colorPicker(DISlabel)
                },
                {
                    // stock's name
                    label: BNTXlabel,
                    // high for each day in reverse order to correspond to dates
                    data: BNTXhigh.reverse(),
                    // set background and border color based on stock label
                    backgroundColor: colorPicker(BNTXlabel),
                    borderColor: colorPicker(BNTXlabel)
                },
            ]
        },
    });

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ["GME", "MSFT", "DIS", "BNTX"],
            datasets: [{
                label: 'Highest Stock Value for Month',
                data: [highestStock(GME), highestStock(MSFT), highestStock(DIS), highestStock(BNTX)],
                backgroundColor:  [colorPicker(GMElabel), colorPicker(MSFTlabel), colorPicker(DISlabel), colorPicker(BNTXlabel)],
            }]
        }
    });
    
    

}

main()