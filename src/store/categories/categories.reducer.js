const INITIAL_STATE = {
    categoriesMap: {}
};

export const categoriesReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'SET_CATEGORIES':
            return {
                ...state,
                categoriesMap: payload
            };
        default:
            return state;
    }
};
