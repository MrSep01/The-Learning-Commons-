
import React from 'react';

export interface Zone {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  features: string[];
  capacity: string;
  usage: string;
  // Live Status Fields
  status: 'Available' | 'Busy' | 'At Capacity' | 'Closed' | 'Reserved';
  statusDetail?: string; // e.g., "5 seats left", "Class in session"
}

export interface ImpactMetric {
  name: string;
  value: number;
  label: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  targetAudience: string;
  registrationInfo: string;
  contactPerson: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface BookingResource {
  id: string;
  name: string;
  category: 'room' | 'studio' | 'equipment';
  image: string;
  capacity: string;
  description: string;
  features: string[];
  // Live Status Fields
  status: 'Available' | 'In Use' | 'Maintenance' | 'Booked';
  nextAvailable?: string; // e.g. "15 min", "2:00 PM"
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Tutor {
  id: string;
  name: string;
  role: 'Teacher' | 'Peer Tutor' | 'External Expert';
  subjects: string[];
  bio: string;
  image: string;
  availableSlots: string[];
  rating: number;
}

export interface HelpCenter {
  id: string;
  name: string;
  location: string;
  status: 'Open' | 'Closed' | 'Busy';
  currentStaff: string[];
  nextOpenTime?: string;
}

export interface ShowcaseProject {
  id: string;
  title: string;
  studentName: string;
  grade: string;
  category: 'Robotics' | 'Digital Media' | 'Coding' | '3D Design' | 'Art';
  description: string;
  image: string;
  toolsUsed: string[];
  date: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji or icon component name
  color: string;
  earnedDate?: string;
}

export interface Challenge {
  id: string;
  title: string;
  progress: number;
  total: number;
  rewardXP: number;
}

export interface UserProfile {
  name: string;
  studentId: string;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  badges: Badge[];
  challenges: Challenge[];
}

export interface ResourceSheet {
  id: string;
  title: string;
  subject: string;
  type: 'Guide' | 'Worksheet' | 'Cheatsheet' | 'Template';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  downloadUrl: string; // Mock URL
  previewImage?: string; 
}
