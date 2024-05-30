import {SupportedAssets} from '../tokens/tokens';

export type Contact = {
  name?: string;
  address: {[key in SupportedAssets]?: string};
  icon: any;
};
