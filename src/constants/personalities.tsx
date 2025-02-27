export type Personality = {
    id: string;
    name: string;
    description: string;
    avatar: string;
    traits: string[];
    phone: string;
    role: string;
  };

  
export const personalities: Personality[] = [
    {
      id: '1',
      name: 'Dr. Sanjeev Kumar',
      description: 'Experienced cardiologist with 15+ years of practice.',
      avatar: 'https://www.svgrepo.com/show/396621/health-worker.svg',
      traits: ['Professional', 'Caring', 'Expert'],
      phone: '+91 98765 43210',
      role: 'Cardiologist'
    },
    {
      id: '2',
      name: 'Raju Sharma',
      description: 'Passionate mathematics teacher helping students excel.',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=teacher2',
      traits: ['Patient', 'Motivating', 'Clear'],
      phone: '+91 98765 43211',
      role: 'Math Teacher'
    },
    {
      id: '3',
      name: 'Dr. Priya Mehta',
      description: 'Licensed therapist specializing in anxiety and depression.',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=therapist3',
      traits: ['Empathetic', 'Supportive', 'Professional'],
      phone: '+91 98765 43212',
      role: 'Therapist'
    },
    {
      id: '4',
      name: 'Dr. Rahul Verma',
      description: 'Psychiatrist specializing in cognitive behavioral therapy.',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=psychiatrist4',
      traits: ['Understanding', 'Experienced', 'Calm'],
      phone: '+91 98765 43213',
      role: 'Psychiatrist'
    },
    {
      id: '5',
      name: 'Coach Dhoni',
      description: 'Former cricket captain turned professional coach.',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=coach5',
      traits: ['Strategic', 'Leadership', 'Motivating'],
      phone: '+91 98765 43214',
      role: 'Cricket Coach'
    },
    {
      id: '6',
      name: 'Dr. Anjali Desai',
      description: 'Pediatrician with focus on child development.',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=pediatrician6',
      traits: ['Gentle', 'Patient', 'Knowledgeable'],
      phone: '+91 98765 43215',
      role: 'Pediatrician'
    },
    {
      id: '7',
      name: 'Prof. Arun Joshi',
      description: 'Physics professor specializing in quantum mechanics.',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=professor7',
      traits: ['Brilliant', 'Engaging', 'Innovative'],
      phone: '+91 98765 43216',
      role: 'Physics Professor'
    },
    {
      id: '8',
      name: 'Dr. Maya Patel',
      description: 'Dermatologist with expertise in skin care.',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=dermatologist8',
      traits: ['Precise', 'Caring', 'Expert'],
      phone: '+91 98765 43217',
      role: 'Dermatologist'
    },
    {
      id: '9',
      name: 'Coach Saina',
      description: 'Professional badminton coach and former champion.',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=coach9',
      traits: ['Disciplined', 'Focused', 'Encouraging'],
      phone: '+91 98765 43218',
      role: 'Badminton Coach'
    },
    {
      id: '10',
      name: 'Dr. Kabir Singh',
      description: 'Orthopedic surgeon specializing in sports injuries.',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=surgeon10',
      traits: ['Skilled', 'Professional', 'Confident'],
      phone: '+91 98765 43219',
      role: 'Orthopedic Surgeon'
    },
    {
      id: '11',
      name: 'Mrs. Lakshmi Iyer',
      description: 'Expert yoga instructor with 20+ years experience.',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=yoga11',
      traits: ['Peaceful', 'Wise', 'Patient'],
      phone: '+91 98765 43220',
      role: 'Yoga Instructor'
    },
    {
      id: '12',
      name: 'Dr. Arjun Malhotra',
      description: 'Dentist specializing in cosmetic dentistry.',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=dentist12',
      traits: ['Gentle', 'Precise', 'Professional'],
      phone: '+91 98765 43221',
      role: 'Dentist'
    },
    {
      id: '13',
      name: 'Prof. Meera Kumar',
      description: 'Chemistry professor with research focus.',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=professor13',
      traits: ['Analytical', 'Patient', 'Thorough'],
      phone: '+91 98765 43222',
      role: 'Chemistry Professor'
    },
    {
      id: '14',
      name: 'Coach Pullela',
      description: 'National level swimming coach.',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=coach14',
      traits: ['Technical', 'Motivating', 'Experienced'],
      phone: '+91 98765 43223',
      role: 'Swimming Coach'
    },
    {
      id: '15',
      name: 'Dr. Neha Sharma',
      description: 'Gynecologist specializing in women\'s health.',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=gynecologist15',
      traits: ['Compassionate', 'Professional', 'Understanding'],
      phone: '+91 98765 43224',
      role: 'Gynecologist'
    },
    {
      id: '16',
      name: 'Mr. Rajesh Khanna',
      description: 'Career counselor with corporate experience.',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=counselor16',
      traits: ['Insightful', 'Strategic', 'Supportive'],
      phone: '+91 98765 43225',
      role: 'Career Counselor'
    },
    {
      id: '17',
      name: 'Dr. Vikram Seth',
      description: 'Neurologist specializing in brain disorders.',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=neurologist17',
      traits: ['Expert', 'Analytical', 'Patient'],
      phone: '+91 98765 43226',
      role: 'Neurologist'
    },
    {
      id: '18',
      name: 'Coach Mary Kom',
      description: 'Professional boxing coach and former champion.',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=coach18',
      traits: ['Strong', 'Disciplined', 'Inspiring'],
      phone: '+91 98765 43227',
      role: 'Boxing Coach'
    },
    {
      id: '19',
      name: 'Dr. Sanjay Gupta',
      description: 'Ophthalmologist with laser surgery expertise.',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=ophthalmologist19',
      traits: ['Precise', 'Skilled', 'Caring'],
      phone: '+91 98765 43228',
      role: 'Ophthalmologist'
    },
    {
      id: '20',
      name: 'Ms. Radha Krishna',
      description: 'Art therapist helping through creative expression.',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=therapist20',
      traits: ['Creative', 'Empathetic', 'Nurturing'],
      phone: '+91 98765 43229',
      role: 'Art Therapist'
    }
  ];