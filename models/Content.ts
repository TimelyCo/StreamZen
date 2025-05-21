import mongoose from 'mongoose';

export interface IContent extends mongoose.Document {
  title: string;
  description: string;
  type: 'movie' | 'tv-show';
  genre: string[];
  releaseYear: number;
  duration: number;
  rating: number;
  posterUrl: string;
  videoUrl: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['movie', 'tv-show'],
    required: [true, 'Please specify the content type'],
  },
  genre: [{
    type: String,
    required: [true, 'Please provide at least one genre'],
  }],
  releaseYear: {
    type: Number,
    required: [true, 'Please provide the release year'],
  },
  duration: {
    type: Number,
    required: [true, 'Please provide the duration in minutes'],
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  posterUrl: {
    type: String,
    required: [true, 'Please provide a poster URL'],
  },
  videoUrl: {
    type: String,
    required: [true, 'Please provide a video URL'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Create indexes for better search performance
contentSchema.index({ title: 'text', description: 'text' });
contentSchema.index({ genre: 1 });
contentSchema.index({ type: 1 });
contentSchema.index({ featured: 1 });

export default mongoose.models.Content || mongoose.model<IContent>('Content', contentSchema); 