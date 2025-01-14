'use client';
import { useEffect, useState } from 'react';

const Page = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/fetchdata'); 
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
        const result = await res.json();

        if (result.results && result.results[0]?.hits) {
          setData(result.results[0].hits); 
          setFilteredData(result.results[0].hits); 
        } else {
          throw new Error('Data is not in the expected format');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // search query
      const filtered = data.filter((item: any) => {
      const orgName = item.orgName?.toLowerCase() || '';
      const orgState = item.orgState?.toLowerCase() || '';
      const docDescription = item.docDescription?.toLowerCase() || '';

      return (
        orgName.includes(query) ||
        orgState.includes(query) ||
        docDescription.includes(query)
      );
    });

    setFilteredData(filtered);
  };

  // truncate 
  const truncate = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : text;
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

  return (
    <div className="relative px-4 md:px-[350px] py-[15px]">
     

      {/* Search Box */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
      </div>

      {/* Cards  */}
      <div className=" bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredData.map((item: any, index: number) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg hover:translate-y-[-5px] hover:border-orange-500 transition-all duration-200 flex flex-col justify-between h-[300px]"
          >
            {/* Card Content */}
            <div className="flex items-start space-x-4 mb-4">
              {/* Image  */}
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={item.link || '/placeholder-image.png'}
                  alt={item.orgName || 'Organization Logo'}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col flex-grow">
                {/* docdesciption*/}
                <p className="text-sm font-medium text-gray-600 ">
                  {truncate(item.docDescription || 'Ministry Not Specified', 3)}
                </p>
                {/* State */}
                <p className="text-sm font-bold text-gray-800 mt-1">{item.orgName || 'No Name'}</p>
                <p className="text-sm text-gray-500">{item.orgState || 'All States'}</p>
              </div>
            </div>

            
            <p className="text-sm text-gray-700 mt-2 flex-grow overflow-hidden">
              {truncate(item.description || 'No description available', 20)}
            </p>
          </div>
        ))}
      </div>

      {/* No Results Found */}
      {filteredData.length === 0 && (
        <div className="text-center text-gray-500 mt-10">No results found.</div>
      )}
    </div>
  );
};

export default Page;
