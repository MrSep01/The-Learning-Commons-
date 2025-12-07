
import React from 'react';
import { Zone, EventItem, TeamMember, BookingResource, Tutor, HelpCenter, ShowcaseProject, UserProfile, Badge, ResourceSheet } from './types';
import { IconCpu, IconBookOpen, IconUsers, IconLightbulb, IconPresentation } from './components/Icons';

export const ZONES_DATA: Zone[] = [
  {
    id: 'innovation',
    title: 'Innovation Center',
    description: 'A high-energy, tech-heavy makerspace designed for creative prototyping, coding, and digital media production. This zone encourages noise, experimentation, and hands-on building.',
    icon: <IconCpu className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
    features: ['3D Printers (Prusa & MakerBot)', 'VEX Robotics Kits', 'High-Spec Coding Stations', 'Green Screen Video Suite'],
    capacity: '20-25 Students',
    usage: 'Best for: STEM projects, robotics clubs, video production, and "noisy" collaboration.',
    status: 'Available',
    statusDetail: '12 seats open'
  },
  {
    id: 'collaboration',
    title: 'Collaboration Commons',
    description: 'The social heart of the Learning Commons. Featuring flexible, coffee-shop style seating and modular tables that can be rearranged for any group size. It supports social learning and peer-to-peer interaction.',
    icon: <IconUsers className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    features: ['Modular Tables', 'Whiteboard Walls', 'Charging Hubs', 'Lounge Seating'],
    capacity: '40-50 Students',
    usage: 'Best for: Group study, casual reading, peer tutoring, and social breaks.',
    status: 'Busy',
    statusDetail: 'Low noise level'
  },
  {
    id: 'portfolio',
    title: 'Portfolio Support Center',
    description: 'A dedicated consultation hub for academic and career planning. Here, students work with counselors to curate digital portfolios, refine college applications, and prepare for interviews.',
    icon: <IconBookOpen className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
    features: ['Consultation Pods', 'Digital Archiving Scanners', 'Resume Editing Stations', 'Project Display Boards'],
    capacity: '10-15 Students',
    usage: 'Best for: One-on-one guidance, resume writing, and portfolio curation.',
    status: 'Available',
    statusDetail: 'Walk-ins welcome'
  },
  {
    id: 'subjects',
    title: 'Subject-Specialist Zones',
    description: 'Targeted academic support corners. These semi-private areas are stocked with subject-specific resources and are often staffed by peer tutors or teachers for drop-in help.',
    icon: <IconLightbulb className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop',
    features: ['Math Manipulatives', 'Science Models', 'Speech Practice Podium', 'Writing Center Resources'],
    capacity: '4-6 per Nook',
    usage: 'Best for: Tutoring sessions, speech practice, and focused subject revision.',
    status: 'At Capacity',
    statusDetail: 'Math circle in session'
  },
  {
    id: 'pd',
    title: 'Professional Development Hub',
    description: 'An exclusive space for educators to collaborate, plan curriculum, and engage in continuous learning. Equipped with presentation tech and comfortable seating for department meetings.',
    icon: <IconPresentation className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    features: ['Conference Table', 'Interactive Flat Panel', 'Coffee/Tea Station', 'Planning Boards'],
    capacity: '10-12 Staff',
    usage: 'Best for: Department meetings, curriculum planning, and staff workshops.',
    status: 'Closed',
    statusDetail: 'Reserved for Dept Meeting'
  }
];

export const IMPACT_POINTS = [
  {
    title: "Students",
    description: "Experience personalized learning, access to cutting-edge tech, and a safe space for passion projects.",
    stats: "Improved academic outcomes & engagement."
  },
  {
    title: "Teachers",
    description: "Gain a hub for co-teaching, professional development, and cross-curricular collaboration.",
    stats: "Enhanced instructional capacity."
  },
  {
    title: "Parents",
    description: "Become active partners through workshops, family STEM nights, and the Virtual Commons portal.",
    stats: "Stronger home-school connection."
  },
  {
    title: "Community",
    description: "Access to lifelong learning opportunities, guest lectures, and shared innovation resources.",
    stats: "A true community learning hub."
  }
];

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Family STEM Night',
    description: 'Join us for an evening of robotics demos, science experiments, and family coding challenges.',
    date: 'October 25, 2023',
    time: '6:00 PM - 8:00 PM',
    location: 'Innovation Center',
    targetAudience: 'Students (All Ages) & Families',
    registrationInfo: 'RSVP via Parent Portal by Oct 23',
    contactPerson: 'Mr. James Wilson'
  },
  {
    id: '2',
    title: 'College Portfolio Workshop',
    description: 'Seniors: Learn how to curate your digital portfolio for college applications with guidance counselors.',
    date: 'November 2, 2023',
    time: '3:30 PM - 5:00 PM',
    location: 'Portfolio Support Center',
    targetAudience: 'Grade 12 Students',
    registrationInfo: 'Drop-ins welcome, sign-up encouraged',
    contactPerson: 'Ms. Sarah Chen'
  },
  {
    id: '3',
    title: 'Intro to 3D Printing',
    description: 'Beginner workshop for students and parents. Learn to design and print your first 3D model.',
    date: 'November 10, 2023',
    time: '4:00 PM - 5:30 PM',
    location: 'Innovation Center',
    targetAudience: 'Students (Grades 6-12) & Parents',
    registrationInfo: 'Limited to 15 spots, register online',
    contactPerson: 'Innovation Lab Team'
  },
   {
    id: '4',
    title: 'Community Book Club',
    description: 'Open discussion for parents and staff about "The Future of Learning" and modern educational trends.',
    date: 'November 15, 2023',
    time: '7:00 PM - 8:30 PM',
    location: 'Collaboration Zone',
    targetAudience: 'Parents, Staff & Alumni',
    registrationInfo: 'No registration required',
    contactPerson: 'Dr. Somsak P.'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Somsak P.',
    role: 'Director of Learning Commons',
    bio: 'Leading the vision for 21st-century learning environments with over 15 years of educational leadership experience.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Head Librarian & Media Specialist',
    bio: 'Expert in digital literacy and information science, bridging the gap between traditional books and digital resources.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'James Wilson',
    role: 'Innovation Lab Coordinator',
    bio: 'A maker at heart, James guides students through robotics, coding, and 3D design projects.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Priya Patel',
    role: 'Community Outreach Manager',
    bio: 'Facilitating partnerships between the school, parents, and local organizations to enrich learning opportunities.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop'
  }
];

export const BOOKING_RESOURCES: BookingResource[] = [
  {
    id: 'room-1',
    name: 'Group Study Room A',
    category: 'room',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    capacity: '4-6 People',
    description: 'Soundproof glass room with whiteboard walls and HDMI screen connection.',
    features: ['TV Screen', 'Whiteboard', 'Soundproof'],
    status: 'Booked',
    nextAvailable: '10:00 AM'
  },
  {
    id: 'room-2',
    name: 'Group Study Room B',
    category: 'room',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop',
    capacity: '4-6 People',
    description: 'Quiet collaboration space with natural light and ergonomic seating.',
    features: ['Whiteboard', 'Power Outlets', 'Ergonomic Chairs'],
    status: 'Available',
    nextAvailable: 'Now'
  },
  {
    id: 'studio-1',
    name: 'Podcast Studio',
    category: 'studio',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
    capacity: '2-4 People',
    description: 'Professional audio recording suite with 4 mics, mixer, and soundproofing.',
    features: ['Rodecaster Pro', 'Shure SM7B Mics', 'Acoustic Treatment'],
    status: 'Available',
    nextAvailable: 'Now'
  },
  {
    id: 'studio-2',
    name: 'Green Screen Suite',
    category: 'studio',
    image: 'https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?q=80&w=800&auto=format&fit=crop',
    capacity: '3-5 People',
    description: 'Video production area with lighting rig, green backdrop, and 4K camera.',
    features: ['4K Camera', 'Lighting Kit', 'Tripod'],
    status: 'In Use',
    nextAvailable: '1 hr'
  },
  {
    id: 'equip-1',
    name: 'Prusa 3D Printer (01)',
    category: 'equipment',
    image: 'https://images.unsplash.com/photo-1631541909061-71e349d1f203?q=80&w=800&auto=format&fit=crop',
    capacity: '1 Person',
    description: 'High-precision 3D printer for student prototypes and projects.',
    features: ['PLA Filament', 'PrusaSlicer Software', 'Safety Enclosure'],
    status: 'In Use',
    nextAvailable: '15 min'
  },
  {
    id: 'equip-2',
    name: 'VR Headset (Quest 2)',
    category: 'equipment',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269fb1bd?q=80&w=800&auto=format&fit=crop',
    capacity: '1 Person',
    description: 'Virtual reality headset for immersive educational experiences.',
    features: ['Controllers', 'Educational Apps', 'Casting Capable'],
    status: 'Maintenance',
    nextAvailable: 'Tomorrow'
  }
];

export const TUTORS_DATA: Tutor[] = [
  {
    id: 't1',
    name: 'Mr. David Lee',
    role: 'Teacher',
    subjects: ['Math', 'Physics'],
    bio: 'Available for AP Calculus and Physics help. 10 years of teaching experience.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    availableSlots: ['Mon 3:00 PM', 'Wed 3:00 PM', 'Fri 10:00 AM'],
    rating: 4.9
  },
  {
    id: 't2',
    name: 'Jennifer Wu',
    role: 'Peer Tutor',
    subjects: ['Biology', 'Chemistry'],
    bio: 'Grade 12 student specializing in life sciences. Great at explaining complex diagrams.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop',
    availableSlots: ['Tue 4:00 PM', 'Thu 4:00 PM'],
    rating: 4.7
  },
  {
    id: 't3',
    name: 'Ms. Alice Brown',
    role: 'Teacher',
    subjects: ['English', 'History'],
    bio: 'Help with essay writing, thesis statements, and historical analysis.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    availableSlots: ['Mon 11:00 AM', 'Wed 11:00 AM'],
    rating: 5.0
  },
  {
    id: 't4',
    name: 'Michael Chen',
    role: 'Peer Tutor',
    subjects: ['Computer Science', 'Math'],
    bio: 'Grade 11 coding enthusiast. Can help with Python, Java, and Algebra II.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    availableSlots: ['Fri 3:30 PM', 'Sat 10:00 AM'],
    rating: 4.8
  }
];

export const HELP_CENTERS_DATA: HelpCenter[] = [
  {
    id: 'math',
    name: 'Math & Science Corner',
    location: 'Zone 04 (Subject Specialist)',
    status: 'Open',
    currentStaff: ['Mr. David Lee', 'Jennifer Wu']
  },
  {
    id: 'writing',
    name: 'Writing Center',
    location: 'Zone 04 (Subject Specialist)',
    status: 'Busy',
    currentStaff: ['Ms. Alice Brown'],
    nextOpenTime: '2:00 PM'
  },
  {
    id: 'lang',
    name: 'Language Lab',
    location: 'Zone 02 (Quiet Nook)',
    status: 'Closed',
    currentStaff: [],
    nextOpenTime: 'Tomorrow 9:00 AM'
  }
];

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'p1',
    title: 'Solar-Powered Weather Station',
    studentName: 'Alex & Sam',
    grade: 'Grade 10',
    category: 'Robotics',
    description: 'A fully functional weather station collecting temperature, humidity, and UV data, powered entirely by solar energy. Built using Arduino and 3D printed components.',
    image: 'https://images.unsplash.com/photo-1565514020176-dbf2277cc114?q=80&w=800&auto=format&fit=crop',
    toolsUsed: ['Arduino', '3D Printing', 'Solar Panels', 'C++'],
    date: 'Oct 15, 2023'
  },
  {
    id: 'p2',
    title: 'History of BCC: VR Experience',
    studentName: 'Creative Tech Club',
    grade: 'Grade 11-12',
    category: 'Digital Media',
    description: 'An immersive Virtual Reality tour of Bangkok Christian College through different decades. Users can walk through historical buildings recreated in 3D.',
    image: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?q=80&w=800&auto=format&fit=crop',
    toolsUsed: ['Unity', 'Blender', 'Oculus Quest', 'Photoshop'],
    date: 'Sep 20, 2023'
  },
  {
    id: 'p3',
    title: 'Automated Hydroponics Garden',
    studentName: 'Biology x Engineering Team',
    grade: 'Grade 9',
    category: 'Coding',
    description: 'An automated system monitoring water pH and light levels for indoor plants. Alerts are sent to a student-built mobile app.',
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800&auto=format&fit=crop',
    toolsUsed: ['Raspberry Pi', 'Python', 'Sensors', 'React Native'],
    date: 'Nov 05, 2023'
  },
  {
    id: 'p4',
    title: 'Sustainable Architecture Model',
    studentName: 'Pim T.',
    grade: 'Grade 12',
    category: '3D Design',
    description: 'A scale model of an eco-friendly community center, designed with sustainable materials and passive cooling techniques.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
    toolsUsed: ['Laser Cutter', 'AutoCAD', 'Woodworking'],
    date: 'Oct 01, 2023'
  },
  {
    id: 'p5',
    title: 'Podcast: "Student Voices"',
    studentName: 'Media Literacy Class',
    grade: 'Grade 8',
    category: 'Digital Media',
    description: 'A student-run podcast series discussing school life, mental health, and interviews with alumni.',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
    toolsUsed: ['Podcast Studio', 'Audacity', 'Microphones'],
    date: 'Weekly Release'
  },
   {
    id: 'p6',
    title: 'AI Chess Bot',
    studentName: 'Kenji',
    grade: 'Grade 11',
    category: 'Coding',
    description: 'A chess engine trained to play against students. It adapts its difficulty level based on the opponent\'s ELO.',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=800&auto=format&fit=crop',
    toolsUsed: ['Python', 'TensorFlow', 'UI Design'],
    date: 'Aug 30, 2023'
  }
];

export const MOCK_USER_PROFILE: UserProfile = {
  name: 'Student Guest',
  studentId: 'BCC-2023-001',
  level: 4,
  currentXP: 450,
  nextLevelXP: 600,
  badges: [
    { id: 'b1', name: 'Early Bird', description: 'Visited the Commons before 8 AM for a week.', icon: '🌅', color: 'bg-yellow-100 text-yellow-600', earnedDate: 'Sep 10, 2023' },
    { id: 'b2', name: 'Bookworm', description: 'Checked out 10 books in a month.', icon: '📚', color: 'bg-blue-100 text-blue-600', earnedDate: 'Oct 05, 2023' },
    { id: 'b3', name: 'Tech Explorer', description: 'Completed "Intro to 3D Printing" workshop.', icon: '🤖', color: 'bg-purple-100 text-purple-600', earnedDate: 'Oct 15, 2023' }
  ],
  challenges: [
    { id: 'c1', title: 'Read 3 Biographies', progress: 1, total: 3, rewardXP: 100 },
    { id: 'c2', title: 'Attend 2 STEM Workshops', progress: 1, total: 2, rewardXP: 150 },
    { id: 'c3', title: 'Use a Quiet Zone for 5 hours', progress: 3.5, total: 5, rewardXP: 50 }
  ]
};

export const RESOURCE_SHEETS_DATA: ResourceSheet[] = [
  {
    id: 'r1',
    title: 'Calculus: Derivatives Cheat Sheet',
    subject: 'Math',
    type: 'Cheatsheet',
    difficulty: 'Advanced',
    description: 'A single-page reference guide for all major derivative rules, chain rule, and common trigonometric derivatives.',
    downloadUrl: '#',
    previewImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'r2',
    title: 'Essay Structure Template (MLA)',
    subject: 'English',
    type: 'Template',
    difficulty: 'Intermediate',
    description: 'Fill-in-the-blank outline for argumentative essays, including thesis statement placeholders and citation format.',
    downloadUrl: '#',
    previewImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'r3',
    title: 'Periodic Table & Trends',
    subject: 'Science',
    type: 'Guide',
    difficulty: 'Intermediate',
    description: 'Color-coded periodic table highlighting electronegativity trends, atomic radius, and ionization energy.',
    downloadUrl: '#',
    previewImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'r4',
    title: 'Python Basics: Syntax Guide',
    subject: 'Computer Science',
    type: 'Cheatsheet',
    difficulty: 'Beginner',
    description: 'Quick look-up for variables, loops, lists, and dictionaries in Python 3. Great for beginners.',
    downloadUrl: '#',
    previewImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'r5',
    title: 'The French Revolution: Timeline',
    subject: 'History',
    type: 'Guide',
    difficulty: 'Intermediate',
    description: 'Visual timeline of key events from the Storming of the Bastille to the Rise of Napoleon.',
    downloadUrl: '#',
    previewImage: 'https://images.unsplash.com/photo-1569485061144-8c435552a466?q=80&w=400&auto=format&fit=crop'
  },
   {
    id: 'r6',
    title: 'Lab Report Checklist',
    subject: 'Science',
    type: 'Template',
    difficulty: 'Beginner',
    description: 'Don\'t miss a step! Ensure your hypothesis, materials, procedure, and conclusion are all perfect before submitting.',
    downloadUrl: '#',
    previewImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=400&auto=format&fit=crop'
  }
];
