/**
 * an elegance way to write reducer
 * @param funcMap the functions map
 * @param initState initiate state
 * @returns {Function}
 */
const createReducer = (funcMap, initialState) => {
  return (state = initialState, action) => funcMap.hasOwnProperty(action.type) ? funcMap[action.type](state, action) : state
}

export { createReducer }
