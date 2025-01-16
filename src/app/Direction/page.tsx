'use client';
import { useEffect, useState } from 'react';

const Page = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedStates, setSelectedStates] = useState<string[]>([]); // For state filtering
  const [showFilter, setShowFilter] = useState<boolean>(false); // toggle filter 
  const itemsPerPage = 9;

  // Fetch API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/fetchdata');
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
        const result = await res.json();
  
        if (Array.isArray(result.hits)) {
          setData(result.hits); // Set the hits directly
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
  
  // Filter data based on selected states and search query
  useEffect(() => {
    const filterData = (states: string[], query: string) => {
      const filtered = data.filter((item: any) => {
        const orgName = item.orgName?.toLowerCase() || '';
        const orgState = item.orgState?.toLowerCase() || '';
        const docDescription = item.docDescription?.toLowerCase() || '';
        const stateMatches = states.length === 0 || states.includes(orgState.toLowerCase());

        return (
          (orgName.includes(query) || 
          orgState.includes(query) || 
          docDescription.includes(query)) && stateMatches
        );
      });

      setFilteredData(filtered);
    };

    if (data.length > 0) {
      filterData(selectedStates, searchQuery); // Apply filter after data is fetched
    }
  }, [data, selectedStates, searchQuery]); // Re-apply filter when data, selectedStates, or searchQuery changes

  // Handle state filter changes
  const handleStateChange = (state: string) => {
    setSelectedStates((prevStates) => {
      const updatedStates = prevStates.includes(state)
        ? prevStates.filter((s) => s !== state)
        : [...prevStates, state];
      return updatedStates;
    });
  };

  // Handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  // Pagination 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < filteredData.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Truncate function
  const truncate = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : text;
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

  // Get unique states for filter
  const uniqueStates = Array.from(new Set(data.map(item => item.orgState).filter(Boolean)));

  return (
    <div className="relative px-4 lg:px-[350px] py-[15px] flex">
     
      
      <div
        className={`w-[400px] bg-white p-4 shadow-lg rounded-lg mr-2 mt-[65px] mb-[65px] lg:block ${showFilter ? 'block' : 'hidden'}`}
      >
        <h3 className="text-lg font-semibold mb-2">Filters</h3>
        <h4 className="text-md font-semibold opacity-70 mb-4">Locations</h4>
        <div className="space-y-2">
          {uniqueStates.map((state, index) => (
            <div key={index} className="flex items-center opacity-50">
              <input
                type="checkbox"
                id={state}
                checked={selectedStates.includes(state.toLowerCase())}
                onChange={() => handleStateChange(state.toLowerCase())}
                className="mr-2"
              />
              <label htmlFor={state} className="text-sm">{state}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex-grow">
        {/* Search Box */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Filter Button (Only visible below search bar on small screens) */}
        <div className="flex justify-center mb-4 lg:hidden">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="px-3 py-2 bg-orange-500 text-white  text-sm"
          >
            Filter
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentItems.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg hover:translate-y-[-5px] hover:border-orange-500 transition-all duration-200 flex flex-col justify-between h-[300px]"
            >
              {/* Card Content */}
              <div className="flex items-start space-x-4 mb-4">
                {/* Image */}
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={item.link || '/placeholder-image.png'}
                    alt={item.orgName || 'Organization Logo'}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  {/* Doc Description */}
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

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-400 disabled:opacity-50"
          >
            &lt;
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage * itemsPerPage >= filteredData.length}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-400 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>

        {/* No Results Found */}
        {filteredData.length === 0 && (
          <div className="text-center text-gray-500 mt-10">No results found.</div>
        )}
      </div>
    </div>
  );
};

export default Page;
