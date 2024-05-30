export type Token = {
  id: string;
  name: string;
  symbol: string;
  source: any;
  decimals: number;
};

export type SupportedAssets = 'stx' | 'btc' | 'eth' | 'sol' | 'polygon' | 'usdc' | 'shib';

export const assets: {[key in SupportedAssets]: Token} = {
  stx: {
    id: 'stx',
    name: 'Stacks',
    symbol: 'STX',
    source: require('./assets/token-stx.png'),
    decimals: 6,
  },
  btc: {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    source: require('./assets/token-btc.png'),
    decimals: 8,
  },
  eth: {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    source: require('./assets/token-eth.png'),
    decimals: 6,
  },
  sol: {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    source: require('./assets/token-sol.png'),
    decimals: 6,
  },
  usdc: {
    id: 'usdc',
    name: 'USDC',
    symbol: 'USDC',
    source: require('./assets/token-usdc.png'),
    decimals: 2,
  },
  polygon: {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    source: require('./assets/token-polygon.png'),
    decimals: 6,
  },
  shib: {
    id: 'shib',
    name: 'Shibu Inu',
    symbol: 'SHIB',
    source: require('./assets/token-shib.png'),
    decimals: 0,
  },
};
