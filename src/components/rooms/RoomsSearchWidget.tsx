import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, Users, Search, ChevronDown, Plus, Minus, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface SearchWidgetProps {
  onSearch: (data: SearchData) => void;
}

export interface SearchData {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
}

export function RoomsSearchWidget({ onSearch }: SearchWidgetProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  const [searchData, setSearchData] = useState<SearchData>({
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    adults: parseInt(searchParams.get('adults') || '1'),
    children: parseInt(searchParams.get('children') || '0'),
  });

  useEffect(() => {
    // Trigger search when component mounts if dates are present
    if (searchData.checkIn && searchData.checkOut) {
      onSearch(searchData);
    }
  }, []);

  const handleSearch = () => {
    // Update URL params
    const params = new URLSearchParams();
    if (searchData.checkIn) params.set('checkIn', searchData.checkIn);
    if (searchData.checkOut) params.set('checkOut', searchData.checkOut);
    params.set('adults', searchData.adults.toString());
    params.set('children', searchData.children.toString());

    navigate(`/rooms?${params.toString()}`, { replace: true });
    onSearch(searchData);
  };

  const updateGuests = (type: 'adults' | 'children', change: number) => {
    setSearchData(prev => ({
      ...prev,
      [type]: Math.max(type === 'adults' ? 1 : 0, prev[type] + change),
    }));
  };

  const totalGuests = searchData.adults + searchData.children;
  const today = new Date().toISOString().split('T')[0];
  const minCheckOut = searchData.checkIn || today;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-4 shadow-lg border border-neutral-200"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Check-in Date */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-2">
            Check-in
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
            <input
              type="date"
              min={today}
              value={searchData.checkIn}
              onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
              className="w-full pl-10 pr-3 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500 transition-all"
            />
          </div>
        </div>

        {/* Check-out Date */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-2">
            Check-out
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
            <input
              type="date"
              min={minCheckOut}
              value={searchData.checkOut}
              onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
              className="w-full pl-10 pr-3 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500 transition-all"
            />
          </div>
        </div>

        {/* Guests Dropdown */}
        <div className="relative">
          <label className="block text-xs font-semibold text-neutral-700 mb-2">
            Guests
          </label>
          <button
            type="button"
            onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
            className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-neutral-400" />
              <span className="font-medium">
                {totalGuests} {totalGuests === 1 ? 'Guest' : 'Guests'}
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform ${showGuestsDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Guests Dropdown Menu */}
          {showGuestsDropdown && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowGuestsDropdown(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-neutral-200 p-4 z-20"
              >
                {/* Adults */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-semibold text-neutral-900">Adults</div>
                    <div className="text-sm text-neutral-600">Age 13+</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateGuests('adults', -1)}
                      disabled={searchData.adults <= 1}
                      className="w-8 h-8 rounded-full border-2 border-neutral-300 flex items-center justify-center hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center font-semibold">
                      {searchData.adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateGuests('adults', 1)}
                      className="w-8 h-8 rounded-full border-2 border-neutral-300 flex items-center justify-center hover:border-primary-500 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-neutral-900">Children</div>
                    <div className="text-sm text-neutral-600">Age 0-12</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateGuests('children', -1)}
                      disabled={searchData.children <= 0}
                      className="w-8 h-8 rounded-full border-2 border-neutral-300 flex items-center justify-center hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center font-semibold">
                      {searchData.children}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateGuests('children', 1)}
                      className="w-8 h-8 rounded-full border-2 border-neutral-300 flex items-center justify-center hover:border-primary-500 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowGuestsDropdown(false)}
                  className="w-full mt-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all"
                >
                  Done
                </button>
              </motion.div>
            </>
          )}
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            disabled={!searchData.checkIn || !searchData.checkOut}
            className="w-full py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>

      {/* Active Search Info */}
      {searchData.checkIn && searchData.checkOut && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-neutral-200 flex items-center justify-between"
        >
          <div className="text-sm text-neutral-600">
            Showing available rooms for{' '}
            <span className="font-semibold text-neutral-900">
              {new Date(searchData.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              {' - '}
              {new Date(searchData.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            {' • '}
            <span className="font-semibold text-neutral-900">
              {totalGuests} {totalGuests === 1 ? 'guest' : 'guests'}
            </span>
          </div>
          <button
            onClick={() => {
              setSearchData({ checkIn: '', checkOut: '', adults: 1, children: 0 });
              navigate('/rooms', { replace: true });
              onSearch({ checkIn: '', checkOut: '', adults: 1, children: 0 });
            }}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
