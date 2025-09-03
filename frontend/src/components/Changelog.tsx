import { useState, useEffect } from 'react';
import axios from 'axios';

interface ChangelogItem {
  id: number;
  title: string;
  date: string;
  description: string | null;
  image: string;
  video: string | null;
  tags: string[];
  category: string;
  updated_by?: string;
  published: boolean;
  url?: string;
}

interface Category {
  title: string;
  category: string;
}

interface HeaderData {
  title: string;
  description: string;
  logo: string;
  link: string;
  email?: string;
}

const Changelog = () => {
  const [data, setData] = useState<ChangelogItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [headerData, setHeaderData] = useState<HeaderData>({
    title: "",
    description: "",
    logo: "",
    link: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = new URLSearchParams(window.location.search);

  const tagColors: Record<string, string> = {
    new: 'bg-green-500 border-green-200',
    bugfix: 'bg-yellow-500 border-yellow-200',
    security: 'bg-red-500 border-red-200',
    update: 'bg-blue-500 border-blue-200',
    performance: 'bg-purple-500 border-purple-200',
    optimization: 'bg-indigo-500 border-indigo-200',
    maintenance: 'bg-orange-500 border-orange-200',
    features: 'bg-emerald-500 border-emerald-200',
    release: 'bg-pink-500 border-pink-200',
    initial: 'bg-cyan-500 border-cyan-200',
    default: 'bg-gray-500 border-gray-200',
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `/api/method/changelog_claudion.changelog_claudion.api.log_claudion.changelog_claudion`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && response.data.message && response.data.message.category) {
        setCategories(response.data.message.category);
        // Set first category as active by default
        if (response.data.message.category.length > 0) {
          const firstCategory = response.data.message.category[0].category;
          setActiveCategory(firstCategory);
          // Fetch changelog for first category
          fetchChangelogByCategory(firstCategory);
        }
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch changelog by category
  const fetchChangelogByCategory = async (category: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching changelog for category:', category);

      const response = await axios.get(
        `/api/method/changelog_claudion.changelog_claudion.api.log_claudion.changelog_claudion`,
        {
          params: {
            category: category,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Changelog response:', response);

      if (response.data && response.data.message && response.data.message.data) {
        setHeaderData({
          title: response.data.message.title,
          description: response.data.message.description,
          logo: response.data.message.logo,
          link: response.data.message.link,
          email: response.data.message.email
        });

        // Filter only published items and sort by date (newest first)
        const publishedData = response.data.message.data
          .filter((item: ChangelogItem) => item.published === true)
          .sort((a: ChangelogItem, b: ChangelogItem) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        setData(publishedData);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error('Error fetching changelog:', err);
      setError('Failed to load changelog data. Please try again later.');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle tab click
  const handleTabClick = (category: string) => {
    setActiveCategory(category);
    fetchChangelogByCategory(category);
  };

  useEffect(() => {
    // Check if category is provided in URL
    const urlCategory = query.get('category');
    if (urlCategory) {
      // Direct category access - no tabs needed
      setActiveCategory(urlCategory);
      setCategories([]); // Don't show tabs for direct category access
      fetchChangelogByCategory(urlCategory);
    } else {
      // Fetch categories and load first one (show tabs)
      fetchCategories();
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading changelog...</p>
        </div>
      </div>
    );
  }

  if (error && categories.length === 0) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-100 to-gray-50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-mono text-lg font-medium">Changleog</h2>
              {headerData.title && <h1 className="font-sans text-3xl font-medium">Whats New at {headerData.title}?</h1>}
            </div>
            {headerData.logo && (
              <img
                src={headerData.logo}
                alt="Logo"
                className="h-12 w-auto mr-3"
              />
            )}
            {/* <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-gray-900">
                {headerData.title}
                <span className="ml-1 font-normal text-gray-600">Changelog</span>
              </h1>
              {headerData.link && (
                <a
                  href={headerData.link}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {headerData.link}
                </a>
              )}
            </div> */}
          </div>


        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 inline-block">
              {error}
            </div>
            <br />
            <button
              onClick={() => fetchChangelogByCategory(activeCategory)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Retry
            </button>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No changelog entries found</div>
            <p className="text-gray-400">Check back later for updates!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Category Tabs - Only show if no direct category in URL */}
            {categories.length > 0 && (
              <div className="mb-8">
                <div className="flex space-x-8 border-b border-gray-200">
                  {categories.map((cat) => (
                    <button
                      key={cat.category}
                      onClick={() => handleTabClick(cat.category)}
                      className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeCategory === cat.category
                          ? 'border-black text-black'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* Changelog description */}
            {headerData.description && (
              <div className="mb-8">
                <p className="text-gray-600 text-lg leading-relaxed">
                  {headerData.description}
                </p>
              </div>
            )}

            

            {data.map((item) => {
              // Format date to Month Year
              const dateObj = new Date(item.date);
              const monthYear = dateObj.toLocaleString('default', { 
                month: 'long', 
                year: 'numeric' 
              });

              return (
                <div
                  className=" rounded-lg shadow-sm shadow-green-100 border border-green-200 overflow-hidden hover:shadow-md transition-shadow"
                  key={item.id}
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Date */}
                      <div className="sm:min-w-[140px] flex-shrink-0">
                        <span className="inline-block text-gray-500 px-3 py-1 rounded-full text-sm font-medium">
                          {monthYear}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="mb-3">
                          <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            {item.title}
                          </h2>
                          {/* Tags always below title */}
                          <div className="flex flex-wrap gap-2 mb-1">
                            {item.tags && item.tags.map((tag: string) => (
                              <span
                                key={tag}
                                className={`px-3 py-1 rounded-full text-xs font-light border text-white ${
                                  tagColors[tag] || tagColors.default
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {item.description && (
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {item.description}
                          </p>
                        )}

                        {/* Media */}
                        <div className="space-y-4">
                          {item.image && item.image !== '' && (
                            <div className="rounded-lg border border-gray-200">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-fit object-fit"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            </div>
                          )}

                          {item.video && (
                            <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-900">
                              <video
                                className="w-full h-64 sm:h-80"
                                controls
                                onError={(e) => {
                                  const target = e.target as HTMLVideoElement;
                                  target.style.display = 'none';
                                }}
                              >
                                <source src={item.video} />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          )}
                        </div>

                        {/* Links */}
                        {item.url && (
                          <div className="mt-4">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              {item.url}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-600">
                &copy; {new Date().getFullYear()} {headerData.title}. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {headerData.link && (
                <a
                  href={headerData.link}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
              )}
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Back to Top
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Changelog;