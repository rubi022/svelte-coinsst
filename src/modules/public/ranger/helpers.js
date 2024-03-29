import { marketStreams } from './actions';
export const generateSocketURI = (baseUrl, s) => `${baseUrl}/?stream=${s.sort().join('&stream=')}`;
export const formatTicker = (events) => {
    const tickers = {};
    for (const market in events) {
        if (events.hasOwnProperty(market)) {
            const event = events[market];
            const { open, low, high, last, volume, sell, buy, avg_price, price_change_percent } = event;
            tickers[market] = { open, low, high, last, sell, buy, vol: volume, avg_price, price_change_percent };
        }
    }
    return tickers;
};
export const streamsBuilder = (withAuth, prevSubscriptions, market) => {
    let streams = ['global.tickers'];
    if (withAuth) {
        streams = [
            ...streams,
            'order',
            'trade',
            'account',
            'deposit_address'
        ];
    }
    if (market) {
        streams = [
            ...streams,
            ...(marketStreams(market).channels),
        ];
    }
    for (const stream of prevSubscriptions) {
        if (streams.indexOf(stream) < 0) {
            streams.push(stream);
        }
    }
    return streams;
};
export const periodsMapNumber = {
    '1m': 1,
    '5m': 5,
    '15m': 15,
    '30m': 30,
    '1h': 60,
    '2h': 120,
    '4h': 240,
    '6h': 360,
    '12h': 720,
    '1d': 1440,
    '3d': 4320,
    '1w': 10080,
};
export const periodsMapString = {
    1: '1m',
    5: '5m',
    15: '15m',
    30: '30m',
    60: '1h',
    120: '2h',
    240: '4h',
    360: '6h',
    720: '12h',
    1440: '1d',
    4320: '3d',
    10080: '1w',
};
export const periodStringToMinutes = (period) => periodsMapNumber[period];
export const periodMinutesToString = (period) => periodsMapString[period];
export const marketKlineStreams = (marketId, periodString) => ({
    channels: [
        `${marketId}.kline-${periodString}`,
    ],
});

