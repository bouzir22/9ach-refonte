import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Modern shopping experience with AI-powered recommendations',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'Node.js', 'AI/ML'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Financial Dashboard',
    description: 'Real-time analytics and portfolio management system',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Vue.js', 'Python', 'D3.js'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Healthcare App',
    description: 'Telemedicine platform connecting patients and doctors',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React Native', 'Firebase', 'WebRTC'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Smart Home IoT',
    description: 'Unified control system for connected devices',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['IoT', 'React', 'MQTT'],
    color: 'from-orange-500 to-red-500'
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing innovative solutions that drive real business results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
              </div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-white/90 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                    <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-colors duration-300">
                      <ExternalLink size={16} />
                      Live Demo
                    </button>
                    <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-colors duration-300">
                      <Github size={16} />
                      Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;