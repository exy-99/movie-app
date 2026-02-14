import { Movie } from "@/services/api";
import React from "react";
import MovieSection from "./MovieSection";

interface SectionRowProps {
    title: string;
    items: Movie[];
}

export default function SectionRow({ title, items }: SectionRowProps) {
    if (!items || items.length === 0) return null;

    return (
        <MovieSection
            title={title}
            movies={items}
            variant="large"
            layout="double-scroll"
            mediaType="movie" // Defaulting to movie for now as per configuration
        />
    );
}
