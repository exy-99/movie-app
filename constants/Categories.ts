import { getEndOfMonth, getMonthName, getStartOfMonth, getYear } from "@/utils/date";

export interface CategoryConfig {
    title: string;
    endpoint: string;
    params?: Record<string, string>;
    type: 'movie' | 'show' | 'anime';
}

const currentDate = new Date();
const currentYear = getYear(currentDate);
const currentMonth = getMonthName(currentDate);

export const CATEGORY_MAP: Record<string, CategoryConfig> = {
    bestOfMonth: {
        title: `BEST OF ${currentMonth.toUpperCase()}`,
        endpoint: '/movies/trending',
        params: {
            sort: 'rank',
            year: currentYear,
            date_from: getStartOfMonth(currentDate),
            date_to: getEndOfMonth(currentDate),
        },
        type: 'movie'
    },
    bestOfYear: {
        title: `BEST OF ${currentYear}`,
        endpoint: '/movies/trending',
        params: {
            sort: 'rank',
            year: currentYear,
        },
        type: 'movie'
    },
    // Adding a couple more to have 5 rows for the Hero to pick from
    action: {
        title: 'ACTION HITS',
        endpoint: '/movies/genres/action/all-types/all-countries/all-years/rank',
        params: {
            limit: '20',
        },
        type: 'movie'
    },
    comedy: {
        title: 'COMEDY GOLD',
        endpoint: '/movies/genres/comedy/all-types/all-countries/all-years/rank',
        params: {
            limit: '20',
        },
        type: 'movie'
    },
    scifi: {
        title: 'SCI-FI WORLDS',
        endpoint: '/movies/genres/science-fiction/all-types/all-countries/all-years/rank',
        params: {
            limit: '20',
        },
        type: 'movie'
    }
};
