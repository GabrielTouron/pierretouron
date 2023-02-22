export const snipcartApiKey =
  process.env.NODE_ENV === "production" ? process.env.NEXT_SNIPCART_API_TOKEN : process.env.NEXT_SNIPCART_API_TOKEN_TEST;
