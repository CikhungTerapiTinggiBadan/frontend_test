import { useState, useEffect } from 'react'
import './App.css'
import {Info, Moon, Sun, Navigation, Map, Landmark, Link as Folder, User, Phone, Search, Loader2, AlertCircle, Mail, HelpCircle, X} from 'lucide-react'

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const themeBgMain = isDarkMode ? 'bg-[#11181d]' : 'bg-white';
  const themeTextMain = isDarkMode ? 'text-white' : 'text-black';
  const themeBorderMain = isDarkMode ? 'border-white' : 'border-black';
  
  const themeBgBlue = isDarkMode ? 'bg-[#1d486a]' : 'bg-[#1800ad]';
  const themeHoverBgBlue = isDarkMode ? 'hover:bg-[#1d486a]' : 'hover:bg-[#1800ad]';
  const themeBorderBlue = isDarkMode ? 'border-[#1d486a]' : 'border-[#1800ad]';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(import.meta.env.VITE_USER_API_URL);

        if (!response.ok) {
          throw new Error(`Error Fetching Data! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  const handleSearch = users.filter(user => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  return (
    <div className={`min-h-screen ${themeBgMain} ${themeTextMain} font-sans transition-colors duration-300`}>
      
{/* Header */}
      <header className={`${themeBgBlue} shadow-sm sticky py-5 top-0 z-40 transition-colors duration-300 ${selectedUser ? 'hidden' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            
            <div className="flex items-center gap-2">
              <div className={`${themeBgBlue} p-2`}>
                <User className="w-10 h-auto text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Daftar Buronan</h1>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                className="px-3 py-1.5 rounded-md transition-transform hover:scale-110 text-white"
                title={isDarkMode ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
              >
                {isDarkMode ? <Sun className="w-8 h-auto inline-block" /> : <Moon className="w-8 h-auto inline-block" />}
              </button>
              
              <div className="relative w-full sm:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className={`h-5 w-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                </div>
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama atau email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border ${themeBorderMain} rounded-lg leading-5 ${themeBgMain} ${themeTextMain} focus:outline-none focus:ring-2 focus:ring-white sm:text-sm transition-all`}
                />
              </div>
            </div>

          </div>
        </div>
      </header>

{/* Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">        
        
{/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p className="font-medium">Memuat data pengguna...</p>
          </div>
        )}

{/* Error State */}
        {!loading && error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start">
            <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-red-800 font-medium">Terjadi Kesalahan</h3>
              <p className="text-red-700 text-sm mt-1">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-3 text-sm bg-red-100 text-red-800 px-3 py-1.5 rounded-md hover:bg-red-200 transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        )}

{/* Empty State */}
        {!loading && !error && handleSearch.length === 0 && (
          <div className="text-center py-20">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium">Tidak ada pengguna ditemukan</h3>
            <p className="mt-1 opacity-70">Coba sesuaikan kata kunci pencarian Anda.</p>
          </div>
        )}

{/* Container User */}
        {!loading && !error && handleSearch.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {handleSearch.map((user) => (
              <div 
                key={user.id} 
                onClick={() => setSelectedUser(user)}
                className={`${themeBgMain} ${themeHoverBgBlue} hover:text-white rounded-xl shadow-lg border-2 ${themeBorderMain} hover:border-white overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group`}
              >
                <div className="p-5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full ${themeBgBlue} flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors`}>
                      <User className={`font-bold text-lg text-white ${isDarkMode ? 'group-hover:text-[#1d486a]' : 'group-hover:text-[#1800ad]'} transition-colors`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold line-clamp-1">{user.name}</h3>
                      <p className="text-sm opacity-80">@{user.username}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 opacity-90">
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{user.phone.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>

                <div className={`px-5 py-3 flex justify-end ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                  <span className="text-sm font-medium">Lihat Detail</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

{/* Footer */}
      <footer className={`${themeBgBlue} bottom-0 border-t border-white py-6 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-white">
            &copy; {new Date().getFullYear()} Widya Robotika. All rights reserved.
          </p>
        </div>
      </footer>

{/* Pop-up User Selected */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className={`${themeBgMain} ${themeTextMain} border ${themeBorderMain} rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all animate-in zoom-in-95 duration-200`}
            onClick={(e) => e.stopPropagation()}
          >
{/* Pop-up Header */}
            <div className={`relative ${themeBgBlue} px-6 py-8 text-center`}>
              <button 
                onClick={() => setSelectedUser(null)}
                className={`absolute top-4 right-4 p-1 rounded-full ${themeBgBlue} text-white hover:bg-white hover:text-black transition-colors border border-white`}
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-inner mb-3">
                <User className={`w-10 h-auto ${isDarkMode ? 'text-[#1d486a]' : 'text-[#1800ad]'}`}/>
              </div>
              <h2 className="text-2xl font-bold text-white">{selectedUser.name}</h2>
              <p className="text-white opacity-90">@{selectedUser.username}</p>
            </div>

{/* Pop-up Body */}
            <div className="p-6 space-y-6">
{/* Contact Info */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 opacity-60">Informasi Kontak</h4>
                <div className="space-y-3">
                  <div className="flex">
                    <Mail className="w-5 h-5" />
                    <div className="pl-6">
                      <p className="text-sm font-medium">{selectedUser.email}</p>
                      <p className="text-xs opacity-60">Email Utama</p>
                    </div>
                  </div>
                  <div className="flex">
                    <Phone className="w-5 h-5" />
                    <div className="pl-6">
                      <p className="text-sm font-medium">{selectedUser.phone}</p>
                      <p className="text-xs opacity-60">Telepon</p>
                    </div>
                  </div>
                  <div className="flex">
                    <Folder className="w-5 h-5" />
                    <div className="pl-6">
                      <p className="text-sm font-medium hover:underline cursor-pointer">
                        www.{selectedUser.website}
                      </p>
                      <p className="text-xs opacity-60">Website</p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className={isDarkMode ? 'border-gray-800' : 'border-gray-200'} />

{/* Company Info */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 opacity-60">Perusahaan</h4>
                <div className={`flex justify-between items-center ${themeBgMain} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-3 rounded-lg`}>
                  
                  <div className="flex items-center gap-4">
                    <Landmark className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold">{selectedUser.company.name}</p>
                      <p className="text-sm italic opacity-80">"{selectedUser.company.catchPhrase}"</p>
                      <p className="text-xs mt-1 opacity-60">{selectedUser.company.bs}</p>
                    </div>
                  </div>

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedUser.address.geo.lat},${selectedUser.address.geo.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${themeBgMain} ${themeHoverBgBlue} hover:text-white ${themeTextMain} border ${themeBorderMain} py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer flex-shrink-0 shadow-sm`}
                  >
                    <Navigation size={16} />
                    <span className="hidden sm:inline">ke {selectedUser.company.name}</span>
                  </a>

                </div>
              </div>

{/* Address Info */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 opacity-60">Alamat</h4>
                <div className="flex items-start">
                  <Map className="w-5 h-5 flex-shrink-0" />
                  <div className="pl-6">
                    <p className="text-sm">
                      {selectedUser.address.street}, {selectedUser.address.suite}
                    </p>
                    <p className="text-sm">
                      {selectedUser.address.city}, {selectedUser.address.zipcode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
{/* Pop-up Footer */}
            <div className={`px-6 py-4 border-t flex justify-end ${isDarkMode ? 'bg-[#0b1013] border-gray-800' : 'bg-gray-50 border-gray-100'}`}>
              <button 
                onClick={() => setSelectedUser(null)}
                className={`px-4 py-2 ${themeBgMain} border ${themeBorderBlue} text-current rounded-lg ${themeHoverBgBlue} hover:text-white font-medium transition-colors focus:outline-none`}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}