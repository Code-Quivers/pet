const fileUrlKey = (): string => {
  const key = process.env.NEXT_PUBLIC_FILE_URL_KEY;
  if (key) {
    return key;
  }
  return "";
};
export const stripePublishableKey = (): string => {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
};
