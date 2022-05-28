export  function throttle(fn:any, space:number) {
    let timer:any = null;
    return function (value:any) {
        if(!timer) {
            fn(value)
            timer = true;
            timer = setTimeout(() => timer = false, space);
        }
    }
}