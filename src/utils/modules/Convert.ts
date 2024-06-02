export const Convert = {
  secondToTime: (second: number) => {
    if (second < 60) {
      return `${second}s`;
    }
    if (second < 3600) {
      if (second % 60) {
        return `${Math.floor(second / 60)}m ${second % 60}s`;
      }
      return `${Math.floor(second / 60)}m`;
    }
  },
};
