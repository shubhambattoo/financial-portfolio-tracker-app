import db from './../firebase/init';
import { format } from 'date-fns';
import axios from 'axios';

const apiEndpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=${process.env.REACT_APP_APIKEY}`;

export const getStockLists = async () => {
  try {
    const querySnapshot = await db.collection('stocks').get();
    const stocks = querySnapshot.docs.map(doc => doc.data());
    return stocks;
  } catch (error) {
    return [];
  }
};

const formatTrackedStocks = async tracked => {
  try {
    const allData = tracked.map(async data => {
      try {
        const res = await axios.get(
          apiEndpoint + `&symbol=${data.stockSymbol}`
        );
        const today = format(new Date(), 'yyyy-MM-dd');
        if (res.data['Note']) {
          throw new Error('server error')
        }
        const currentDayData = res.data['Time Series (Daily)'][today];
        data['stockData'] = currentDayData;
        data['profit'] =
          data.numberOfShares * currentDayData['4. close'] -
          data.buyPrice * data.numberOfShares;
        return data;
      } catch (error) {
        throw new Error(error);
      }
    });
    return await Promise.all(allData);
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const getTrackedStocks = async () => {
  try {
    const querySnapshot = await db.collection('trackedStocks').get();
    const tracked = querySnapshot.docs.map(doc => doc.data());
    // console.log(tracked);
    // eslint-disable-next-line array-callback-return
    const data = await formatTrackedStocks(tracked);
    return data;
  } catch (error) {
    return error;
  }
};
