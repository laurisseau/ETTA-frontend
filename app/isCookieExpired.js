const isCookieExpired = (userCookie) => {
  const cookieValue = JSON.parse(userCookie);
  const expirationDate = cookieValue.expirationDate;
  const currentDate = new Date();
  const currentIsoTimestamp = currentDate.toISOString();

  if (cookieValue) {
    if (expirationDate <= currentIsoTimestamp) {
      console.log('Cookie has expired');
      return true;
    }
  }

  console.log('Cookie is still valid');
  return false;
};

export default isCookieExpired;
