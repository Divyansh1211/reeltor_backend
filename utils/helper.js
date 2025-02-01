const isUserAvailable = (availabilityTime) => {
  const [start, end] = availabilityTime
    .split("-")
    .map((time) => parseInt(time.replace(":", ""), 10));
  const currentTime = new Date();
  const now = currentTime.getHours() * 100 + currentTime.getMinutes();
  return now >= start && now <= end;
};

module.exports = { isUserAvailable };
