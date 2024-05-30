export type DerivationPath = {hardened: boolean; index: number}[];
const DERIVATION_INDEX_MAX_VALUE = 268435455; // uint31

export const derivationPathStringToArray = (derivationPath: string): DerivationPath => {
  const pathArray = derivationPath.split('/');
  pathArray.shift();
  const path: DerivationPath = pathArray.map((component) => ({
    hardened: component.slice(-1) === "'",
    index: parseInt(component),
  }));
  if (path.find((component) => component.index > DERIVATION_INDEX_MAX_VALUE) !== undefined) {
    console.error('one of the indexes is too high');
    return [];
  }
  return path;
};

export function derivationPathByteLength(path: DerivationPath) {
  return path.length * 4 + 1;
}

export function derivationPathToBytes(path: DerivationPath) {
  return [
    path.length,
    ...path
      .map((p) => {
        const value = p.hardened ? p.index + 0x80000000 : p.index;
        return [value, value << 8, value << 16, value << 24].map((z) => z >>> 24);
      })
      .flat(),
  ];
}
