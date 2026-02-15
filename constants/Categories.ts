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

export const MOVIE_CATEGORIES: Record<string, CategoryConfig> = {
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
    action: {
        title: 'ACTION HITS',
        endpoint: '/movies/genres/action/all-types/all-countries/all-years/rank',
        params: { limit: '20' },
        type: 'movie'
    },
    comedy: {
        title: 'COMEDY GOLD',
        endpoint: '/movies/genres/comedy/all-types/all-countries/all-years/rank',
        params: { limit: '20' },
        type: 'movie'
    },
    scifi: {
        title: 'SCI-FI WORLDS',
        endpoint: '/movies/genres/science-fiction/all-types/all-countries/all-years/rank',
        params: { limit: '20' },
        type: 'movie'
    }
};

export const TV_CATEGORIES: Record<string, CategoryConfig> = {
    trending: {
        title: 'TRENDING SHOWS',
        endpoint: '/tv/trending',
        params: { interval: 'week', sort: 'rank' },
        type: 'show'
    },
    topRated: {
        title: 'TOP RATED TV',
        endpoint: '/tv/best',
        params: { filter: 'all-countries' },
        type: 'show'
    },
    drama: {
        title: 'DRAMATIC TALES',
        endpoint: '/tv/genres/drama/all-types/all-countries/all-years/rank',
        params: { limit: '20' },
        type: 'show'
    },
    animation: {
        title: 'ANIMATED SERIES',
        endpoint: '/tv/genres/animation/all-types/all-countries/all-years/rank',
        params: { limit: '20' },
        type: 'show'
    }
};

export const ANIME_CATEGORIES: Record<string, CategoryConfig> = {
    trending: {
        title: 'TRENDING ANIME',
        endpoint: '/anime/trending',
        params: { interval: 'week', sort: 'rank' },
        type: 'anime'
    },
    topRated: {
        title: 'ALL TIME BEST',
        endpoint: '/anime/best',
        params: { filter: 'all-countries' },
        type: 'anime'
    },
    action: {
        title: 'HIGH OCTANE',
        endpoint: '/anime/genres/action/all-types/all-countries/all-years/rank',
        params: { limit: '20' },
        type: 'anime'
    },
    fantasy: {
        title: 'FANTASY WORLDS',
        endpoint: '/anime/genres/fantasy/all-types/all-countries/all-years/rank',
        params: { limit: '20' },
        type: 'anime'
    }
};
