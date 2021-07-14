const initState = "...";

const RATE_SET = "RATE_SET";

const RateReducer = (state = initState, action) => {
  let copy;

  switch (action.type) {
    case RATE_SET:
      copy = action.rate;
      return copy;
    default:
      return state;
  }
};

export default { reducer: RateReducer, actions: { RATE_SET } };
