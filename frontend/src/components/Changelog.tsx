
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
  url?: string;
}

const Changelog = () => {
  const [data, setData] = useState<ChangelogItem[]>([]);
  const [headerData, setHeaderData] = useState<any>({

    title: "",
    description: "",
    logo: "",
    link: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = new URLSearchParams(window.location.search);



  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        setLoading(true);
        setError(null);

        const category = query.get('category') || null;
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
          // Filter for claudion category only and sort by date (newest first)
          const claudionData = response.data.message.data
            .sort((a: ChangelogItem, b: ChangelogItem) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
            );
          setData(claudionData);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error('Error fetching changelog:', err);
        setError('Failed to load changelog data. Please try again later.');
        // Fallback to empty array if API fails
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChangelog();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading changelog...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            {headerData.logo && (
              < img
                src={headerData.logo}
                alt="Logo"
                className="h-12 w-auto mr-3"
              />
            )}
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-gray-900">
                {
                  headerData.title
                }<span className=" ml-1 font-normal text-gray-600">Changelog</span>
              </h1>
              <a
                href={headerData.link}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {headerData.link}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {data.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No changelog entries found</div>
            <p className="text-gray-400">Check back later for updates!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* changelog description */}
            {headerData.description && (
              <div className="mb-8">
                <p className="text-gray-600 text-lg leading-relaxed">
                  {headerData.description}
                </p>
              </div>
            )}
            {
              data.map((item) => {

                console.log('Rendering item:', item);
                // Format date to Month Year
                const dateObj = new Date(item.date);
                const monthYear = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });
                // Tag color map
                const tagColors: Record<string, string> = {
                  new: 'bg-green-500 border-green-200',
                  bugfix: 'bg-yellow-500 border-yellow-200',
                  security: 'bg-red-500 border-red-200',
                  default: 'bg-gray-500 border-gray-200',
                };

                return (
                  <div
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    key={item.id}
                  >
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        {/* Date */}
                        <div className="sm:min-w-[140px] flex-shrink-0">
                          <span className="inline-block  text-gray-500 px-3 py-1 rounded-full text-sm font-medium">
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
                                  className={`px-3 py-1 rounded-full text-xs font-light border text-white ${tagColors[tag] || tagColors.default}`}
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
                              <div className="rounded-lg overflow-hidden border border-gray-200">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full max-w-md h-48 object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                              </div>
                            )}

                            {item.video && (
                              <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-900">
                                {/* <iframe
                                src={item.video}
                                title={item.title}
                                className="w-full h-64 sm:h-80"
                                allowFullScreen
                              /> */}

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

                          {/* links */}
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
              })
            }
            {/* footer */}

          </div>
        )}
      </div>
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-600">
                &copy; {new Date().getFullYear()} {headerData.title}. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {
              headerData.link && (<a
                href={headerData.link}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </a>)
              }
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