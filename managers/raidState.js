let raidActive = false;
let raidInterval = null;

module.exports = {
  get raidActive() {
    return raidActive;
  },
  
  get raidInterval() {
    return raidInterval;
  },

  setRaidActive(state) {
    raidActive = state;
  },

  setRaidInterval(interval) {
    raidInterval = interval;
  },

  clearRaidInterval() {
    if (raidInterval) {
      clearInterval(raidInterval);
      raidInterval = null;
    }
  }
};
