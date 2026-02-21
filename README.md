# 🎬 Movie App

A high-performance, aesthetically pleasing React Native application built with **Expo**, **TypeScript**, and **Simkl API**. This project demonstrates modern mobile development patterns, featuring dynamic routing, global state persistence, and a highly modular component architecture.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo Go (on your mobile device) or Android Simulator / iOS Simulator

### Installation

1.  **Clone & Install**:
    ```bash
    git clone <repo-url>
    cd movie-app
    npm install
    ```

2.  **Environment Setup**:
    Ensure you have your Simkl Client ID ready.
    Create a `.env` file (if not already present) or ensure `EXPO_PUBLIC_SIMKL_CLIENT_ID` is set in your environment.

3.  **Run the App**:
    ```bash
    npx expo start
    ```
    - Press `a` for Android.
    - Press `i` for iOS.
    - Press `w` for Web.

---

## 🔧 The Nuts and Bolts: Architecture Deep Dive

This project is built on a robust foundation designed for scalability and maintainability. Here's how the core systems work:

### 1. 🧭 Navigation Strategy (Expo Router)
We use **Expo Router** (v3+), which implements **file-based routing**. This means the file structure in `/app` directly maps to the application's navigation state.
-   **`app/_layout.tsx`**: The entry point. It sets up the global `Stack` navigator and critical providers (Foundations, GestureHandler). It also handles the splash screen logic to ensure resources (fonts) are loaded before UI rendering.
-   **`app/(tabs)/_layout.tsx`**: Defines the main application shell using a `Tabs` navigator. It employs a **Custom Tab Bar** (`CustomTabBar.tsx`) to implement a unique, floating design that differs from standard native tab bars.
-   **Dynamic Routes**: Files like `app/details/movie/[id].tsx` use brackets to denote dynamic segments, allowing us to pass IDs cleanly through the URL schema (e.g., `/details/movie/12345`).

### 2. 🧠 State Management (Zustand)
We use **Zustand** for global state management due to its minimal boilerplate and high performance.
-   **Store Location**: `store/collections.ts`
-   **Persistence**: The store is wrapped with `persist` middleware using `AsyncStorage`. This ensures that user data (like "Saved Collections" or "Watchlist") survives app restarts.
-   **Optimization**: We maintain a `savedItemIds` dictionary (Hash Map) alongside the list arrays. This allows for **O(1) lookups** to check if a movie is saved, avoiding expensive array traversals during rendering.

### 3. 📡 Data Layer & API Services
All external interactions are encapsulated in `services/api.ts`.
-   **Service Pattern**: Components do not fetch data directly; they call service functions (e.g., `getHeroMovies()`, `getMovieDetails()`). This decouples UI from API implementation details.
-   **Caching Strategy**: A custom caching layer (`services/cache.ts`) intercepts requests. If data is available locally and fresh, it returns the cached version immediately, significantly reducing network load and improving perceived performance.
-   **Data normalization**: The raw API response from Simkl is "normalized" into our internal `Movie` and `MovieDetails` interfaces (`types/ui.ts`). This ensures the UI always receives a consistent shape, regardless of the underlying API variations.

### 4. 🎨 UI & Styling (NativeWind)
We use **NativeWind**, which brings **Tailwind CSS** to React Native.
-   **Utility-First**: Styling is done via `className` props, keeping styles co-located with markup.
-   **Custom Components**: The `components/` directory contains "dumb" UI components (e.g., `MovieCard`, `HeroCarousel`) that focus purely on presentation. "Smart" containers pass data down to them.

---

## 📂 Directory Structure

```
/app
├── _layout.tsx        # Root layout (Stack + Providers)
├── (tabs)/            # Main tab navigation
│   ├── _layout.tsx    # Tab configuration
│   └── index.tsx      # Home screen
└── details/           # Detailed views
    └── movie/[id].tsx # Dynamic movie detail page

/components            # Reusable UI Blocks
├── Header.tsx         # Main app header
├── HeroCarousel.tsx   # Featured content slider
├── MediaFeed.tsx      # Horizontal scrolling lists
└── MovieSection.tsx   # Section container

/services
├── api.ts             # Simkl API wrapper
└── cache.ts           # Caching logic

/store
└── collections.ts     # Global state (Watchlist, Custom Lists)

/types
└── ui.ts              # TypeScript interfaces (Movie, Collection, etc.)
```

---

## 🚧 Status & Roadmap

-   **Search**: Functional, with enrichment logic to fetch missing genre data.
-   **Persistence**: Fully implemented for custom collections.
-   **API Coverage**: Core Movie endpoints are mapped. _Note: Some specific filter endpoints (like 'movies by year') are currently stubbed and return empty arrays._
-   **Next Steps**:
    -   Implement full Series/TV Show support (currently partial).
    -   Add user authentication / sync with Simkl account.
    -   Refine error boundaries for network failures.
