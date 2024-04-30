function Timer(state, dispatch, start, setStart, setSuccess) {
    if (state.seconds == 0 && state.minutes > 0) {
        dispatch((prev) => ({
            ...prev,
            seconds: 59,
            minutes: prev.minutes - 1
        }));
    } else if (
        state.seconds == 0 &&
        state.minutes == 0 &&
        state.hours == 0 &&
        state.days == 0 &&
        start
    ) {
        dispatch((prev) => ({
            ...prev,
            seconds: 0
        }));
        setStart((prev) => !prev);
        setSuccess("The countdown is over, what's next in your adventure?");
    } else if (state.seconds == 0 && state.minutes == 0 && state.hours > 0) {
        dispatch((prev) => ({
            ...prev,
            seconds: 59,
            minutes: 59,
            hours: prev.hours - 1,
        }));
    } else if (
        state.seconds == 0 &&
        state.minutes == 0 &&
        state.hours == 0 &&
        state.days > 0
    ) {
        dispatch((prev) => ({
            ...prev,
            days: prev.days - 1
        }));
    }
}

function setTime(input, dispatch, state, setError) {
    if (input) {
        let val = new Date(input).getTime() - new Date().getTime();
        dispatch((prev) => ({
            days: Math.floor(val / (1000 * 60 * 60 * 24)) > 0 ?
                Math.floor(val / (1000 * 60 * 60 * 24)) : 0,
            hours: Math.floor((val / (1000 * 60 * 60)) % 24) > 0 ? Math.floor((val / (1000 * 60 * 60)) % 24) : 0,
            minutes: Math.floor((val / (1000 * 60)) % 60) > 0 ? Math.floor((val / (1000 * 60)) % 60) : 0,
            seconds: Math.floor((val / 1000) % 60) > 0 ? Math.floor((val / 1000) % 60) : 0,
        }));
    }
    if (state.days > 100) {
        setError("Selected time is more than 100 days")
    } else {
        setError("")
    }
}

export {
    Timer,
    setTime
}