const AVAILABLE_TOKENS = Object.freeze({
    'BTC': {
        'name': 'Bitcoin',
        'symbol': 'BTC',
        'decimals': 8,
        'icon': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
    },
    'ETH': {
        'name': 'Ethereum',
        'symbol': 'ETH',
        'decimals': 18,
        'icon': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    },
    'USDT': {
        'name': 'Tether',
        'symbol': 'USDT',
        'decimals': 6,
        'icon': 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    },
    'BNB': {
        'name': 'Binance Coin',
        'symbol': 'BNB',
        'decimals': 18,
        'icon': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    },
    'ADA': {
        'name': 'Cardano',
        'symbol': 'ADA',
        'decimals': 6,
        'icon': 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png',
    },
    'XRP': {
        'name': 'XRP',
        'symbol': 'XRP',
        'decimals': 6,
        'icon': 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
    },
    'DOGE': {
        'name': 'Dogecoin',
        'symbol': 'DOGE',
        'decimals': 8,
        'icon': 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
    },
    'DOT': {
        'name': 'Polkadot',
        'symbol': 'DOT',
        'decimals': 10,
        'icon': 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png',
    },
    'LTC': {
        'name': 'Litecoin',
        'symbol': 'LTC',
        'decimals': 8,
        'icon': 'https://s2.coinmarketcap.com/static/img/coins/64x64/2.png',
    },
    'BCH': {
        'name': 'Bitcoin Cash',
        'symbol': 'BCH',
        'decimals': 8,
        'icon': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png',
    },
    'LINK': {
        'name': 'Chainlink',
        'symbol': 'LINK',
        'decimals': 18,
        'icon': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png',
    },
    'XLM': {
        'name': 'Stellar',
        'symbol': 'XLM',
        'decimals': 7,
        'icon': 'https://s2.coinmarketcap.com/static/img/coins/64x64/512.png',
    },
    'USDC': {
        'name': 'USD Coin',
        'symbol': 'USDC',
        'decimals': 6,
        'icon': 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
    },
    'UNI': {
        'name': 'Uniswap',
        'symbol': 'UNI',
        'decimals': 18,
        'icon': 'https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png',
    },
    'WBTC': {
        'name': 'Wrapped Bitcoin',
        'symbol': 'WBTC',
        'decimals': 8,
        'icon': 'https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png',
    },
})

export const DEFAULT_TOKEN = AVAILABLE_TOKENS.USDT;