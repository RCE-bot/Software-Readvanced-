import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, BookOpen, Code, Database, Cpu, Globe, FileText } from 'lucide-react';
import { gsap, ScrollTrigger } from '../hooks/useGSAP';

// Mock data for resources - in a real app, this would come from an API
const mockResources = [
  {
    id: 1,
    title: "Introduction to Object-Oriented Programming",
    description: "Learn the fundamentals of OOP including classes, objects, inheritance, and polymorphism.",
    category: "OOP",
    difficulty: "Beginner",
    type: "Article",
    tags: ["Classes", "Objects", "Inheritance", "Polymorphism"],
    url: "https://realpython.com/python3-object-oriented-programming/"
  },
  {
    id: 2,
    title: "Python Data Structures Deep Dive",
    description: "Comprehensive guide to Python's built-in data structures and their use cases.",
    category: "Python",
    difficulty: "Intermediate",
    type: "Tutorial",
    tags: ["Lists", "Dictionaries", "Sets", "Tuples"],
    url: "https://docs.python.org/3/tutorial/datastructures.html"
  },
  {
    id: 3,
    title: "Software Design Patterns",
    description: "Essential design patterns every software engineer should know.",
    category: "Software Engineering",
    difficulty: "Advanced",
    type: "Documentation",
    tags: ["Singleton", "Factory", "Observer", "Strategy"],
    url: "https://refactoring.guru/design-patterns"
  },
  {
    id: 4,
    title: "Database Normalization Guide",
    description: "Understanding database normalization and its importance in system design.",
    category: "Database",
    difficulty: "Intermediate",
    type: "Guide",
    tags: ["SQL", "Normalization", "Design", "Performance"],
    url: "https://www.studytonight.com/dbms/database-normalization.php"
  },
  {
    id: 5,
    title: "Algorithms and Complexity Analysis",
    description: "Big O notation, common algorithms, and performance optimization techniques.",
    category: "Algorithms",
    difficulty: "Intermediate",
    type: "Course",
    tags: ["Big O", "Sorting", "Searching", "Optimization"],
    url: "https://www.khanacademy.org/computing/computer-science/algorithms"
  },
  {
    id: 6,
    title: "Web Development Fundamentals",
    description: "HTML, CSS, and JavaScript basics for building modern web applications.",
    category: "Web Development",
    difficulty: "Beginner",
    type: "Tutorial",
    tags: ["HTML", "CSS", "JavaScript", "Frontend"],
    url: "https://developer.mozilla.org/en-US/docs/Learn"
  },
  {
    id: 7,
    title: "Python Decorators Explained",
    description: "Master Python decorators with practical examples and real-world use cases.",
    category: "Python",
    difficulty: "Advanced",
    type: "Article",
    tags: ["Decorators", "Functions", "Metaprogramming", "Advanced"],
    url: "https://realpython.com/primer-on-python-decorators/"
  },
  {
    id: 8,
    title: "Clean Code Principles",
    description: "Writing maintainable, readable code that stands the test of time.",
    category: "Software Engineering",
    difficulty: "Intermediate",
    type: "Guide",
    tags: ["Clean Code", "Best Practices", "Refactoring", "Maintainability"],
    url: "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html"
  },
  {
    id: 9,
    title: "React Hooks Complete Guide",
    description: "Comprehensive guide to React Hooks including custom hooks and advanced patterns.",
    category: "Web Development",
    difficulty: "Intermediate",
    type: "Tutorial",
    tags: ["React", "Hooks", "useState", "useEffect"],
    url: "https://react.dev/reference/react"
  },
  {
    id: 10,
    title: "SQL Query Optimization",
    description: "Techniques to optimize SQL queries for better database performance.",
    category: "Database",
    difficulty: "Advanced",
    type: "Course",
    tags: ["SQL", "Performance", "Indexing", "Query Planning"],
    url: "https://sqlbolt.com/"
  },
  {
    id: 11,
    title: "Git Version Control Mastery",
    description: "From basic commits to advanced Git workflows and collaboration strategies.",
    category: "DevOps",
    difficulty: "Intermediate",
    type: "Tutorial",
    tags: ["Git", "Version Control", "Branching", "Collaboration"],
    url: "https://learngitbranching.js.org/"
  },
  {
    id: 12,
    title: "Docker Containerization Guide",
    description: "Learn containerization with Docker from basics to production deployment.",
    category: "DevOps",
    difficulty: "Intermediate",
    type: "Course",
    tags: ["Docker", "Containers", "Deployment", "DevOps"],
    url: "https://docs.docker.com/get-started/"
  },
  {
    id: 13,
    title: "Machine Learning Fundamentals",
    description: "Introduction to ML concepts, algorithms, and practical implementations.",
    category: "Machine Learning",
    difficulty: "Beginner",
    type: "Course",
    tags: ["ML", "Algorithms", "Python", "Data Science"],
    url: "https://www.coursera.org/learn/machine-learning"
  },
  {
    id: 14,
    title: "TypeScript for JavaScript Developers",
    description: "Transition from JavaScript to TypeScript with practical examples and best practices.",
    category: "Web Development",
    difficulty: "Intermediate",
    type: "Tutorial",
    tags: ["TypeScript", "JavaScript", "Types", "Static Analysis"],
    url: "https://www.typescriptlang.org/docs/"
  },
  {
    id: 15,
    title: "System Design Interview Prep",
    description: "Design scalable systems like experienced engineers do in big tech companies.",
    category: "System Design",
    difficulty: "Advanced",
    type: "Course",
    tags: ["System Design", "Scalability", "Architecture", "Interviews"],
    url: "https://github.com/donnemartin/system-design-primer"
  },
  {
    id: 16,
    title: "REST API Design Best Practices",
    description: "Build robust and scalable RESTful APIs following industry standards.",
    category: "Backend",
    difficulty: "Intermediate",
    type: "Guide",
    tags: ["REST", "API", "HTTP", "Backend"],
    url: "https://restfulapi.net/"
  },
  {
    id: 17,
    title: "Data Structures in Python",
    description: "Implement and understand key data structures with Python examples.",
    category: "Algorithms",
    difficulty: "Beginner",
    type: "Tutorial",
    tags: ["Data Structures", "Python", "Arrays", "Trees"],
    url: "https://www.programiz.com/dsa"
  },
  {
    id: 18,
    title: "Cybersecurity Fundamentals",
    description: "Essential security concepts every developer should understand.",
    category: "Security",
    difficulty: "Beginner",
    type: "Course",
    tags: ["Security", "Cryptography", "Authentication", "HTTPS"],
    url: "https://owasp.org/www-project-top-ten/"
  }
];

const categories = ["All", "Python", "OOP", "Software Engineering", "Database", "Algorithms", "Web Development", "DevOps", "Machine Learning", "System Design", "Backend", "Security"];

interface ResourcesSectionProps {
  shouldFocusSearch?: boolean;
  onSearchFocused?: () => void;
}

// Resources Section Component - Allows browsing, searching, and cataloguing software engineering resources
export default function ResourcesSection({ shouldFocusSearch, onSearchFocused }: ResourcesSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredResources, setFilteredResources] = useState(mockResources);
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter resources based on search and category
  useEffect(() => {
    let filtered = mockResources;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredResources(filtered);
  }, [searchTerm, selectedCategory]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Search bar animation
      gsap.fromTo(searchRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.2,
          scrollTrigger: {
            trigger: searchRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Cards animation
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(cards,
          { y: 30, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.4,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredResources]); // Re-run animation when resources change

  // Handle search focus when navigated from Hero
  useEffect(() => {
    if (shouldFocusSearch && searchInputRef.current) {
      // Small delay to ensure the component is fully rendered
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
        onSearchFocused?.();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [shouldFocusSearch, onSearchFocused]);

  // Get icon for resource type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Article': return <FileText className="w-4 h-4" />;
      case 'Tutorial': return <BookOpen className="w-4 h-4" />;
      case 'Course': return <Cpu className="w-4 h-4" />;
      case 'Documentation': return <Code className="w-4 h-4" />;
      case 'Guide': return <Database className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-gradient-to-b from-black via-gray-900/30 to-black">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl mb-6">
            LEARNING
            <br />
            <span className="text-green-400">RESOURCES</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover curated resources for software engineering, Python, OOP concepts, and more. 
            Build your knowledge with our comprehensive collection.
          </p>
        </div>

        {/* Search and Filters */}
        <div ref={searchRef} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                ref={searchInputRef}
                placeholder="Search resources, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
              />
            </div>

            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="flex flex-wrap justify-center gap-1 bg-gray-800/50 border-gray-700 p-2 h-auto">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="text-xs px-3 py-1 data-[state=active]:bg-green-500 data-[state=active]:text-black whitespace-nowrap hover:bg-green-500/20 hover:text-green-400 transition-all duration-300 hover:scale-105"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Found {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Resource Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="bg-gray-800/50 border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:scale-[1.02] hover:bg-gray-700/50">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(resource.type)}
                    <Badge variant="outline" className="text-xs bg-gray-700/50 border-gray-600">
                      {resource.type}
                    </Badge>
                  </div>
                  <Badge className={`text-xs border ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-white line-clamp-2">{resource.title}</CardTitle>
                <CardDescription className="text-gray-300 line-clamp-3">
                  {resource.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
                  onClick={() => {
                    window.open(resource.url, '_blank', 'noopener,noreferrer');
                  }}
                >
                  View Resource
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl text-white mb-2">No resources found</h3>
            <p className="text-gray-400 mb-4">
              Try adjusting your search terms or selecting a different category.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}