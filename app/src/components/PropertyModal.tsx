import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Listing } from '../types/listing';

interface PropertyModalProps {
  listing: Listing | null;
  show: boolean;
  onClose: () => void;
}

// Pastel badge colors
const pastelColors = [
  { bg: '#ffc4d6', text: '#b8405e' }, // Rosa claro
  { bg: '#c4f0e0', text: '#2d8b6b' }, // Verde menta
  { bg: '#fff4c4', text: '#a89b3d' }, // Amarillo claro
  { bg: '#e4d4f4', text: '#7b5a9e' }, // Lavanda
  { bg: '#ffd4b8', text: '#b86f3d' }, // Durazno
];

const PropertyModal: React.FC<PropertyModalProps> = ({ listing, show, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  if (!listing) return null;

  // Helper functions
  const getPrice = (): string => {
    if (listing.price && listing.price.$numberDecimal) {
      const priceNum = parseFloat(listing.price.$numberDecimal);
      return `$${priceNum.toFixed(0)}`;
    }
    return 'N/D';
  };

  const getLocation = (): string => {
    const parts = [];
    if (listing.address?.street) parts.push(listing.address.street);
    if (listing.address?.market) parts.push(listing.address.market);
    if (listing.address?.country) parts.push(listing.address.country);
    return parts.join(', ') || 'Ubicación no disponible';
  };

  const getImageUrl = (): string => {
    if (listing.images?.picture_url) return listing.images.picture_url;
    if (listing.images?.medium_url) return listing.images.medium_url;
    return 'https://via.placeholder.com/800x600?text=No+Image';
  };

  const getBadgeColor = (index: number) => {
    return pastelColors[index % pastelColors.length];
  };

  const getBathrooms = (): string => {
    if (listing.bathrooms && listing.bathrooms.$numberDecimal) {
      return parseFloat(listing.bathrooms.$numberDecimal).toFixed(1);
    }
    return '0';
  };

  // Get top amenities (max 10)
  const topAmenities = listing.amenities ? listing.amenities.slice(0, 10) : [];

  return (
    <Modal
      show={show}
      onHide={onClose}
      size="xl"
      centered
      backdrop="static"
      keyboard={true}
      dialogClassName="property-modal"
      style={{
        backdropFilter: 'blur(8px)',
      }}
    >
      <Modal.Body
        style={{
          padding: 0,
          borderRadius: '20px',
          overflow: 'hidden',
          maxHeight: '90vh',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            background: 'rgba(255, 255, 255, 0.95)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '24px',
            color: '#333',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.background = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
          }}
        >
          ×
        </button>

        <div
          className="modal-content-wrapper"
          style={{
            display: 'flex',
            flexDirection: 'row',
            minHeight: '600px',
            maxHeight: '90vh',
          }}
        >
          {/* Left Side - Image */}
          <div
            className="modal-image-section"
            style={{
              width: '45%',
              flexShrink: 0,
              position: 'relative',
            }}
          >
            <img
              src={getImageUrl()}
              alt={listing.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src = 'https://via.placeholder.com/800x600?text=No+Image';
              }}
            />
          </div>

          {/* Right Side - Details */}
          <div
            className="modal-details-section"
            style={{
              flex: 1,
              padding: '40px',
              overflowY: 'auto',
              background: '#ffffff',
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
              <h2
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#000000',
                  marginBottom: '8px',
                  lineHeight: 1.3,
                }}
              >
                {listing.name}
              </h2>
              <p
                style={{
                  fontSize: '16px',
                  color: '#6c757d',
                  marginBottom: '16px',
                }}
              >
                📍 {getLocation()}
              </p>

              {/* Badges */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {listing.property_type && (
                  <span
                    style={{
                      backgroundColor: getBadgeColor(0).bg,
                      color: getBadgeColor(0).text,
                      padding: '6px 14px',
                      borderRadius: '99em',
                      fontSize: '14px',
                      fontWeight: '500',
                    }}
                  >
                    {listing.property_type}
                  </span>
                )}
                {listing.room_type && (
                  <span
                    style={{
                      backgroundColor: getBadgeColor(1).bg,
                      color: getBadgeColor(1).text,
                      padding: '6px 14px',
                      borderRadius: '99em',
                      fontSize: '14px',
                      fontWeight: '500',
                    }}
                  >
                    {listing.room_type}
                  </span>
                )}
                <span
                  style={{
                    backgroundColor: getBadgeColor(2).bg,
                    color: getBadgeColor(2).text,
                    padding: '6px 14px',
                    borderRadius: '99em',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  {listing.bedrooms || 0} hab
                </span>
              </div>
            </div>

            {/* Price */}
            <div
              style={{
                padding: '20px',
                background: '#f8f9fa',
                borderRadius: '12px',
                marginBottom: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span
                  style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#5a8a8a',
                    lineHeight: 1,
                  }}
                >
                  {getPrice()}
                </span>
                <span style={{ fontSize: '16px', color: '#6c757d' }}>/noche</span>
              </div>
            </div>

            {/* Capacity */}
            <div style={{ marginBottom: '24px' }}>
              <h4
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#212529',
                  marginBottom: '12px',
                }}
              >
                Capacidad
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>👥</span>
                  <span style={{ fontSize: '15px', color: '#495057' }}>
                    {listing.accommodates || 0} huéspedes
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>🛏️</span>
                  <span style={{ fontSize: '15px', color: '#495057' }}>
                    {listing.beds || 0} camas
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>🚿</span>
                  <span style={{ fontSize: '15px', color: '#495057' }}>
                    {getBathrooms()} baños
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>🏠</span>
                  <span style={{ fontSize: '15px', color: '#495057' }}>
                    {listing.bedrooms || 0} habitaciones
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            {listing.summary && (
              <div style={{ marginBottom: '24px' }}>
                <h4
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#212529',
                    marginBottom: '12px',
                  }}
                >
                  Descripción
                </h4>
                <p
                  style={{
                    fontSize: '15px',
                    color: '#495057',
                    lineHeight: 1.6,
                  }}
                >
                  {listing.summary}
                </p>
              </div>
            )}

            {/* Amenities */}
            {topAmenities.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h4
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#212529',
                    marginBottom: '12px',
                  }}
                >
                  Amenidades
                </h4>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  {topAmenities.map((amenity, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: '#f1f3f5',
                        color: '#495057',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        fontSize: '14px',
                      }}
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Button */}
            {listing.listing_url && (
              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e9ecef' }}>
                <a
                  href={listing.listing_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    width: '100%',
                    padding: '14px 24px',
                    backgroundColor: '#5a8a8a',
                    color: '#ffffff',
                    textDecoration: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#4a7a7a';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(90, 138, 138, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#5a8a8a';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Ver en Airbnb →
                </a>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>

      <style>{`
        .property-modal .modal-dialog {
          max-width: 1200px !important;
          margin: 1.75rem auto;
        }
        
        .property-modal .modal-content {
          border-radius: 20px;
          border: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .property-modal .modal-backdrop {
          backdrop-filter: blur(8px);
          background-color: rgba(0, 0, 0, 0.6);
        }

        .modal-details-section::-webkit-scrollbar {
          width: 6px;
        }

        .modal-details-section::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .modal-details-section::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }

        .modal-details-section::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        /* Responsive */
        @media (max-width: 991px) {
          .modal-content-wrapper {
            flex-direction: column !important;
            max-height: 85vh !important;
          }

          .modal-image-section {
            width: 100% !important;
            height: 300px !important;
          }

          .modal-details-section {
            padding: 24px !important;
          }

          .property-modal .modal-dialog {
            margin: 0.5rem;
          }
        }

        /* Animation */
        .modal.show .modal-dialog {
          animation: modalSlideIn 0.3s ease-out;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .modal.show .modal-dialog {
            animation: none;
          }
        }
      `}</style>
    </Modal>
  );
};

export default PropertyModal;
