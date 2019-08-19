// Debouncer function, simple implementation.
export const debounce = (fn: any, delay: number) => {
    let timer: any = null;
    return function() {
        let context = this;
        let args = arguments;

        clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
};
