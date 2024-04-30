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

function handleStart(input, setStart, setInput, dispatch) {
    if (input) {
        setStart((prev) => {
            if (prev) {
                dispatch((prev) => ({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                }));
                setInput("");
                return !prev;
            } else {
                return !prev;
            }
        });
    } else {
        alert("Please select date");
    }
}

function interval(timer, dispatch, start, setStart, state) {
    timer.current = setInterval(() => {
        if (
            start &&
            (state.days > 0 ||
                state.hours > 0 ||
                state.minutes > 0 ||
                state.seconds > 0)
        ) {
            dispatch((prev) => ({
                ...prev,
                seconds: prev.seconds - 1
            }));
        } else if (start) {
            setStart(false);
        }
    }, 1000);
}
export {
    Timer,
    setTime,
    handleStart,
    interval
}