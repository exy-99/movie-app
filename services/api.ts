import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const EXPO_PUBLIC_MOVIE_API_KEY = process.env.EXPO_PUBLIC_MOVIE_API_KEY;
const EXPO_PUBLIC_RAPIDAPI_HOST2 = process.env.EXPO_PUBLIC_RAPIDAPI_HOST2;


// --- Clients ---
const fastClient = axios.create({
  baseURL: 'https://streaming-availability.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': EXPO_PUBLIC_MOVIE_API_KEY,
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
  },
});


const slowClient = axios.create({
  baseURL: 'https://moviesminidatabase.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': EXPO_PUBLIC_MOVIE_API_KEY,
    'X-RapidAPI-Host': EXPO_PUBLIC_RAPIDAPI_HOST2,
  },
});

// --- Constants ---
const HERO_CACHE_KEY = 'HERO_MOVIES_CACHE';
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 24 hours

// --- Interfaces ---
export interface Movie {
  title: string;
  imdbId: string;
  tmdbId?: string;
  overview?: string;
  releaseYear: number;
  genres?: { id: string; name: string }[];
  rating?: number;
  runtime?: number;
  imageSet?: {
    verticalPoster?: { w480?: string; w720?: string };
    horizontalPoster?: { w1080?: string };
  };
}

export interface MovieDetails extends Movie {
  cast: string[];
  directors: string[];
  streamingOptions?: any; // Keeping it flexible for now
  imageSet: {
    verticalPoster: { w720: string; w480?: string };
    horizontalPoster: { w1080: string };
  };
}

// --- Helper Functions ---
const mapFastApiToMovie = (item: any): Movie => ({
  title: item.title,
  imdbId: item.imdbId,
  tmdbId: item.tmdbId,
  overview: item.overview,
  releaseYear: item.releaseYear,
  genres: item.genres,
  rating: item.rating,
  runtime: item.runtime,
  imageSet: {
    verticalPoster: item.imageSet?.verticalPoster ? { w480: item.imageSet.verticalPoster.w480 } : undefined,
    horizontalPoster: item.imageSet?.horizontalPoster ? { w1080: item.imageSet.horizontalPoster.w1080 } : undefined,
  },
});

// Generic mapper for Slow API - adapting based on potential response structure
// Assuming Slow API returns something like { results: [{ title, imdb_id, gen: [...], ... }] }
// Since I don't have the exact response shape, I'll map common fields and add safety checks.
const mapSlowApiToMovie = (item: any): Movie => ({
  title: item.title,
  imdbId: item.imdb_id || item.imdbId, // API might use snake_case
  releaseYear: parseInt(item.year) || item.releaseYear || 2024,
  genres: item.gen ? item.gen.map((g: any) => ({ id: g.id || g.genre, name: g.genre || g.name })) : [],
  rating: item.rating || 0,
  imageSet: {
    verticalPoster: { w480: item.image_url || item.poster || item.banner || item.primaryImage || 'https://via.placeholder.com/300x450' },
  },
});

// --- API Functions ---

// 1. Hero Movies (Fast API + Cache)
export const getHeroMovies = async (): Promise<Movie[]> => {
  try {
    // Check Cache
    const cachedData = await AsyncStorage.getItem(HERO_CACHE_KEY);
    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION) {
        console.log('✅ Returning cached Hero movies');
        return data;
      } else {
        console.log('⚠️ Hero cache expired');
      }
    }

    console.log('🚀 Fetching Hero movies from Fast API...');
    const response = await fastClient.get('/shows/search/filters', {
      params: {
        country: 'us',
        series_granularity: 'show',
        order_by: 'popularity_1week',
        output_language: 'en',
        show_type: 'movie',
      },
    });

    const movies = response.data.shows.map(mapFastApiToMovie);

    // Save to Cache
    await AsyncStorage.setItem(HERO_CACHE_KEY, JSON.stringify({
      timestamp: Date.now(),
      data: movies,
    }));

    return movies;
  } catch (error) {
    console.error('❌ Error fetching Hero movies:', error);
    return [];
  }
};

// 2. Content Rows (Slow API - Parallel with Error Handling)
export const getContentRows = async () => {
  console.log('🐢 Fetching Content Rows from Slow API...');

  const fetchGenre = async (genre: string) => {
    try {
      const res = await slowClient.get(`/movie/byGen/${genre}/`);
      return res.data.results?.map(mapSlowApiToMovie) || [];
    } catch (error) {
      console.error(`❌ Error fetching ${genre}:`, error);
      return [];
    }
  };

  const fetchUpcoming = async () => {
    try {
      // Fallback: Fetch movies from 2025 since 'upcoming' endpoint is unreliable (404)
      console.log('🔮 Fetching Upcoming (Year 2025)...');
      const res = await slowClient.get('/movie/byYear/2025/');
      return res.data.results?.map(mapSlowApiToMovie) || [];
    } catch (error) {
      console.error('❌ Error fetching Upcoming:', error);
      return [];
    }
  };

  // Execute in parallel but handle independent failures
  const [action, comedy, upcoming] = await Promise.all([
    fetchGenre('Action'),
    fetchGenre('Comedy'),
    fetchUpcoming(),
  ]);

  console.log(`✅ Loaded Rows: Action(${action.length}), Comedy(${comedy.length}), Upcoming(${upcoming.length})`);
  return { action, comedy, upcoming };
};

// 3. Search (Slow API)
export const searchMovies = async (keyword: string): Promise<Movie[]> => {
  if (!keyword || keyword.length < 3) return [];
  console.log(`🐢 Searching Slow API for: ${keyword}`);
  try {
    const response = await slowClient.get(`/movie/byKeywords/${keyword}/`);
    return response.data.results?.map(mapSlowApiToMovie) || [];
  } catch (error) {
    console.error('❌ Error searching movies:', error);
    return [];
  }
};

// 4. Movie Details (Slow API - Parallel with Error Handling)
export const getMovieDetails = async (imdbId: string): Promise<MovieDetails | null> => {
  console.log(`🐢 Fetching Details from Slow API for: ${imdbId}`);
  try {
    // Fetch base details first as it's critical
    let details;
    try {
      const res = await slowClient.get(`/movie/id/${imdbId}/`);
      console.log(`🔍 Raw Details for ${imdbId}:`, JSON.stringify(res.data, null, 2));
      details = res.data;
      if (res.data.results) {
        console.log('⚠️ API returned results array, using first item');
        details = Array.isArray(res.data.results) ? res.data.results[0] : res.data.results;
      }

      if (!details) {
        console.error('❌ Details object is empty after processing');
        return null;
      }
    } catch (e) {
      console.error(`❌ Critical: Failed to fetch details for ${imdbId}`, e);
      return null;
    }

    // Parallel fetch for extras (Cast, etc.)
    const fetchCast = async () => {
      try {
        const res = await slowClient.get(`/movie/id/${imdbId}/cast/`);
        return Array.isArray(res.data.results) ? res.data.results : [];
      } catch (e) {
        console.error('Error fetching cast:', e);
        return [];
      }
    };

    const fetchRecs = async () => {
      // Placeholder for future implementation
      return [];
    };

    const [cast, recs] = await Promise.all([
      fetchCast(),
      fetchRecs()
    ]);

    // Combine into MovieDetails
    const movieBase = mapSlowApiToMovie(details);
    const movieDetails: MovieDetails = {
      ...movieBase,
      overview: details.description || details.plot || 'No overview available.',
      cast: (Array.isArray(cast) ? cast : []).map((c: any) => c.actor || c.name).slice(0, 10),
      directors: details.directors?.map((d: any) => d.name) || [],
      imageSet: {
        verticalPoster: {
          w720: movieBase.imageSet?.verticalPoster?.w720 || movieBase.imageSet?.verticalPoster?.w480 || 'https://via.placeholder.com/300x450',
          w480: movieBase.imageSet?.verticalPoster?.w480
        },
        horizontalPoster: {
          w1080: movieBase.imageSet?.horizontalPoster?.w1080 || 'https://via.placeholder.com/1080x600'
        }
      }
    };

    return movieDetails;

  } catch (error) {
    console.error('❌ Error fetching movie details:', error);
    return null;
  }
};


