import React, { useState } from 'react';
import { Listing } from '../types/listing';
import PropertyModal from './PropertyModal';

interface ListingCardProps {
  listing: Listing;
}

// Pastel badge colors
const pastelColors = [
  { bg: '#ffc4d6', text: '#b8405e' }, // Rosa claro
  { bg: '#c4f0e0', text: '#2d8b6b' }, // Verde menta
  { bg: '#fff4c4', text: '#a89b3d' }, // Amarillo claro
  { bg: '#e4d4f4', text: '#7b5a9e' }, // Lavanda
  { bg: '#ffd4b8', text: '#b86f3d' }, // Durazno
];

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const [showModal, setShowModal] = useState(false);

  // Extract price from MongoDB Decimal128 format
  const getPrice = (): string => {
    if (listing.price && listing.price.$numberDecimal) {
      const priceNum = parseFloat(listing.price.$numberDecimal);
      return `$${priceNum.toFixed(0)}`;
    }
    return 'N/D';
  };

  // Get location string
  const getLocation = (): string => {
    if (listing.address?.market) return listing.address.market;
    if (listing.address?.suburb) return listing.address.suburb;
    if (listing.address?.country) return listing.address.country;
    return 'Ubicación no disponible';
  };

  // Get image URL or placeholder
  const getImageUrl = (): string => {
    if (listing.images?.picture_url) return listing.images.picture_url;
    if (listing.images?.medium_url) return listing.images.medium_url;
    return 'https://via.placeholder.com/400x250?text=No+Image';
  };

  // Get badge color based on property type
  const getBadgeColor = (index: number) => {
    return pastelColors[index % pastelColors.length];
  };

  return (
    <>
      <div
        className="listing-card-mobile"
        onClick={() => setShowModal(true)}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
          height: '200px',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.12)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
      {/* Image Section - Left 40% */}
      <div className="image-section" style={{ width: '40%', flexShrink: 0 }}>
        <img
          src={getImageUrl()}
          alt={listing.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x250?text=No+Image';
          }}
        />
      </div>

      {/* Content Section - Right 60% */}
      <div
        style={{
          flex: 1,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Top Section */}
        <div>
          {/* Title */}
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#000000',
              marginBottom: '8px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={listing.name}
          >
            {listing.name}
          </h3>

          {/* Location */}
          <p
            style={{
              fontSize: '14px',
              color: '#6c757d',
              marginBottom: '12px',
            }}
          >
            {getLocation()}
          </p>

          {/* Badges */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            {/* Property Type Badge */}
            {listing.property_type && (
              <span
                style={{
                  backgroundColor: getBadgeColor(0).bg,
                  color: getBadgeColor(0).text,
                  padding: '4px 12px',
                  borderRadius: '99em',
                  fontSize: '13px',
                  fontWeight: '500',
                }}
              >
                {listing.property_type}
              </span>
            )}

            {/* Bedrooms Badge */}
            <span
              style={{
                backgroundColor: getBadgeColor(1).bg,
                color: getBadgeColor(1).text,
                padding: '4px 12px',
                borderRadius: '99em',
                fontSize: '13px',
                fontWeight: '500',
              }}
            >
              {listing.bedrooms || 0} hab
            </span>
          </div>
        </div>

        {/* Bottom Section - Price */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'flex-end',
            gap: '4px',
          }}
        >
          <span
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#5a8a8a',
              lineHeight: 1,
            }}
          >
            {getPrice()}
          </span>
          <span
            style={{
              fontSize: '14px',
              color: '#6c757d',
            }}
          >
            /noche
          </span>
        </div>
      </div>
    </div>

      {/* Modal */}
      <PropertyModal
        listing={listing}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default ListingCard;
