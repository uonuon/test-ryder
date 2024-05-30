export const toUsdAmount = (amount: number, price: number | undefined) =>
  price !== undefined ? `~ $${parseFloat((amount * price).toFixed(2))}` : '';
