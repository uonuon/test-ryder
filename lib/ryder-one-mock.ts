export const MockData = {
  privateKey: '',
  SECRET_KEY:
    'twice kind fence tip hidden tilt action fragile skin nothing glory cousin green tomorrow spring wrist shed math olympic multiply hip blue scout claw',
};

export const createMockExtendedPublicKey = () => {
  // stx coin from MockData.SECRET_KEY
  return 'xpub6Ev2UU5r6QCSSku2Yp2GYcTmnMJjz7hdoUkb3RCAnYBwoWHnT1dhXq5LS1Z3WyajGieXncfnkEybkU5L7g9nARDojjBUAxDM2enUJLgPDZR';
};

export const serialFromXPubKey = (xPubKey: string) => {
  return `#${xPubKey.substring(xPubKey.length - 4)}`;
};
