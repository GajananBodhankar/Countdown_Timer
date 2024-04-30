const initialState = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
}

function reducerAction(state, action) {
    switch (action.type) {
        case 'days': {
            return {
                ...state,
                days: state.days - 1
            }
        }
        case 'minutes': {
            return {
                ...state,
                minutes: state.minutes - 1
            }
        }
        case 'hours': {
            return {
                ...state,
                hours: state.hours - 1
            }
        }
        case 'seconds': {
            return {
                ...state,
                seconds: state.seconds - 1
            }
        }
        case 'set': {
            return {
                days: action.payload.days,
                hours: action.payload.hours,
                minutes: action.payload.minutes,
                seconds: action.payload.seconds
            }
        }
    }
}

export {
    initialState,
    reducerAction
}