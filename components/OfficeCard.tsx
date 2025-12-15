import React from 'react';
import { Office } from '../types';
import { MapPin, Globe, Phone, Star, Navigation } from 'lucide-react';

interface OfficeCardProps {
  office: Office;
}

const OfficeCard: React.FC<OfficeCardProps> = ({ office }) => {
  // Construct the Google Maps URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(office.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-slate-200 flex flex-col h-full">
      <div className="relative h-48 bg-slate-100 border-b border-slate-100 overflow-hidden group">
        <iframe
          title={`Map of ${office.name}`}
          width="100%"
          height="100%"
          src={mapEmbedUrl}
          className="border-0 grayscale group-hover:grayscale-0 transition-all duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
            {office.state}
          </span>
          <div className="flex items-center text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="ml-1 text-sm font-semibold text-slate-700">{office.rating}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{office.name}</h3>
        
        <div className="space-y-3 mt-2 flex-grow">
          <div className="flex items-start text-slate-600">
            <MapPin size={18} className="mr-2 mt-0.5 flex-shrink-0 text-teal-600" />
            <p className="text-sm">{office.address}</p>
          </div>
          <div className="flex items-center text-slate-600">
            <Phone size={18} className="mr-2 flex-shrink-0 text-teal-600" />
            <p className="text-sm">{office.phone}</p>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <a
            href={office.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
          >
            <Globe size={16} className="mr-2" />
            Website
          </a>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
          >
            <Navigation size={16} className="mr-2" />
            Directions
          </a>
        </div>
      </div>
    </div>
  );
};

export default OfficeCard;