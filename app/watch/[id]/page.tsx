'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import toast from 'react-hot-toast';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

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
  videoUrl: string;
}

export default function Watch({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/content/${params.id}`);
        if (!response.ok) {
          throw new Error('Content not found');
        }
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error('Error fetching content:', error);
        toast.error('Error loading content');
        router.push('/browse');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchContent();
    }
  }, [params.id, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <div className="min-h-screen bg-primary">
      <Navigation />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Video Player */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden mb-8">
            <ReactPlayer
              url={content.videoUrl}
              width="100%"
              height="100%"
              controls
              playing
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload',
                  },
                },
              }}
            />
          </div>

          {/* Content Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-gray-400">{content.releaseYear}</span>
                <span className="text-gray-400">{content.duration} min</span>
                <span className="text-gray-400">
                  {content.type === 'movie' ? 'Movie' : 'TV Show'}
                </span>
              </div>
              <p className="text-gray-300 mb-6">{content.description}</p>
              <div className="flex flex-wrap gap-2">
                {content.genre.map((g) => (
                  <span
                    key={g}
                    className="bg-secondary px-3 py-1 rounded-full text-sm"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-secondary rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">More Like This</h2>
                {/* Similar content recommendations will be added here */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 