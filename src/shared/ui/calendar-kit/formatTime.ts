export const formatTime = (date: Date, format: string) => {
    if(date === null) return null;

    return format
        .replace(/\bhh\b/, (date.getHours().toString().length == 1) ? ("0"+date.getHours().toString()) : date.getHours().toString())
        .replace(/\bmm\b/, (date.getMinutes().toString().length ==1) ? ("0"+date.getMinutes().toString()) : date.getMinutes().toString())
        .replace(/\bss\b/, (date.getSeconds().toString().length ==1) ? ("0"+date.getSeconds().toString()) : date.getSeconds().toString());
};