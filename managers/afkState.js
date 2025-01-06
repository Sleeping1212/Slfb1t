let afkStatus = false;
let afkReason = '';
let afkStartTime = null;

module.exports = {
  get afkStatus() {
    return afkStatus;
  },

  get afkReason() {
    return afkReason;
  },

  get afkStartTime() {
    return afkStartTime;
  },

  setAfkStatus(status) {
    afkStatus = status;
  },

  setAfkReason(reason) {
    afkReason = reason;
  },

  setAfkStartTime(startTime) {
    afkStartTime = startTime;
  }
};
