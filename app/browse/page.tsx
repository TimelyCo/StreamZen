'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';

interface Content {
  _id: string;
  title: string;
  description: string;
  type: 'movie' | 'tv-show';
  genre: string[];
  releaseYear: number;
  duration: number;
  rating: number;
  posterUrl: string;
}

export default function Browse() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',
    genre: 'all',
    year: 'all',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content?' + new URLSearchParams(filters));
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [filters]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <Navigation />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-wrap gap-4">
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="input-field"
            >
              <option value="all">All Types</option>
              <option value="movie">Movies</option>
              <option value="tv-show">TV Shows</option>
            </select>

            <select
              value={filters.genre}
              onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
              className="input-field"
            >
              <option value="all">All Genres</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="sci-fi">Sci-Fi</option>
            </select>

            <select
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              className="input-field"
            >
              <option value="all">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {content.map((item) => (
              <div
                key={item._id}
                className="card cursor-pointer transform hover:scale-105 transition-transform duration-200"
                onClick={() => router.push(`/watch/${item._id}`)}
              >
                <div className="aspect-video relative">
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">
                        {item.type === 'movie' ? 'Movie' : 'TV Show'}
                      </span>
                      <span className="text-sm text-gray-300">
                        {item.releaseYear}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {item.genre.map((g) => (
                        <span
                          key={g}
                          className="text-xs bg-secondary px-2 py-1 rounded"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {item.duration} min
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 