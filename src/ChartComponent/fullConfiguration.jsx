export const getAcks = (controlPlan) => controlPlan.appliedSetpoints.map((v, index) => ({
    y: v.value.toString(),
    x: new Date(v.startTime * 1000),
    reason: v.reason,
  }));
  export const getAcksControlPlan = (controlPlan) => controlPlan.map((v) => ({
    x: new Date(v.dispatchTime * 1000),
    y: v.schedule[0].value.toString(),
    reason: v.schedule[0].reason,
  }));
  export const getReason = (controlPlan) => controlPlan.appliedSetpoints?.map((appliedPoints) => appliedPoints.reason);
  export const getMeterDataValues = (meterData) => meterData?.map((meterDataEnergy) => ({
    y: meterDataEnergy.trendIdValue,
    x: meterDataEnergy.time,
    reason: '',
  }
  )).sort((a, b) => (a.x > b.x ? 1 : -1));