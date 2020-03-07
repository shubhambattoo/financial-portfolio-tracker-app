import db from './../firebase/init';
import { format, subDays } from 'date-fns';
import axios from 'axios';

const apiEndpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=${process.env.REACT_APP_APIKEY}`;

export const getStockLists = async () => {
  try {
    const querySnapshot = await db.collection('stocks').get();
    const stocks = querySnapshot.docs.map(doc => {
      return { ...doc.data(), id: doc.id };
    });
    return stocks;
  } catch (error) {
    return [];
  }
};

const formatTrackedStocks = async tracked => {
  try {
    const allData = tracked.map(async data => {
      const currentDayData = await getOneStockInfo(data);

      if (currentDayData.message) {
        throw new Error('server error');
      }

      data['stockData'] = currentDayData;
      data['profit'] =
        (currentDayData['4. close'] - data.buyPrice) * data.numberOfShares;

      return data;
    });
    const val = await Promise.all(allData);
    // console.log(val);
    return val;
  } catch (error) {
    return error;
  }
};

export const getTrackedStocks = async () => {
  try {
    const querySnapshot = await db.collection('trackedStocks').get();
    const tracked = querySnapshot.docs.map(doc => {
      return { ...doc.data(), id: doc.id };
    });
    // eslint-disable-next-line array-callback-return
    const data = await formatTrackedStocks(tracked);
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const getTrackedDBLen = async () => {
  try {
    const querySnapshot = await db.collection('trackedStocks').get();
    const totalDocs = querySnapshot.docs.length;
    return totalDocs;
  } catch (error) {
    return error;
  }
};

export const addTrackedStock = async (data, id) => {
  try {
    // console.log(data);
    const totalTrack = await getTrackedDBLen();
    if (totalTrack >= 5) {
      throw new Error(5);
    }
    const tracked = await db.collection('trackedStocks').add(data);
    // console.log(tracked.get());
    const stock = await db
      .collection('stocks')
      .doc(id)
      .update({
        isTracking: true
      });
    if (stock && tracked) {
      return tracked.id;
    }
  } catch (error) {
    return error;
  }
};

export const getOneStockInfo = async data => {
  try {
    const res = await axios.get(apiEndpoint + `&symbol=${data.stockSymbol}`);
    if (res.data['Note']) {
      throw new Error('server error');
    }
    const today = new Date();
    const day = today.getDay();
    let formattedToday = format(today, 'yyyy-MM-dd');

    if (day === 6) {
      const backOne = subDays(today, 1);
      formattedToday = format(backOne, 'yyyy-MM-dd');
    } else if (day === 0) {
      const backOne = subDays(today, 2);
      formattedToday = format(backOne, 'yyyy-MM-dd');
    }

    const currentDayData = res.data['Time Series (Daily)'][formattedToday];
    return currentDayData;
  } catch (error) {
    return error;
  }
};

export const updateTracked = async (id, symbol) => {
  try {
    const listId = await getOneStock(symbol);
    await db
      .collection('trackedStocks')
      .doc(id)
      .delete();
    await db
      .collection('stocks')
      .doc(listId)
      .update({ isTracking: false });
    return true;
  } catch (error) {
    return false;
  }
};

export const getOneTracked = async symbol => {
  try {
    const ref = db.collection('tracked').where('stockSymbol', '==', symbol);
    const snapShot = await ref.get();
    let id;
    snapShot.forEach(doc => {
      id = doc.id;
    });
    return id;
  } catch (error) {
    return error;
  }
};

export const getOneStock = async symbol => {
  try {
    const ref = db.collection('stocks').where('symbol', '==', symbol);
    const snapShot = await ref.get();
    let id;
    snapShot.forEach(doc => {
      id = doc.id;
    });
    return id;
  } catch (error) {
    return error;
  }
};
