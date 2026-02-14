export const getStartOfMonth = (date: Date = new Date()): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}-01`;
};

export const getEndOfMonth = (date: Date = new Date()): string => {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    // Day 0 of next month is the last day of this month
    const lastDay = new Date(y, m, 0).getDate();
    return `${y}-${String(m).padStart(2, '0')}-${lastDay}`;
};

export const getStartOfYear = (date: Date = new Date()): string => {
    return `${date.getFullYear()}-01-01`;
};

export const getEndOfYear = (date: Date = new Date()): string => {
    return `${date.getFullYear()}-12-31`;
};

export const getMonthName = (date: Date = new Date()): string => {
    return date.toLocaleString('default', { month: 'long' });
};

export const getYear = (date: Date = new Date()): string => {
    return date.getFullYear().toString();
};
