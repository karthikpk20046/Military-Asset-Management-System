import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  className?: string;
  contentClassName?: string;
  footerContent?: React.ReactNode;
  headerContent?: React.ReactNode;
  loading?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  contentClassName = '',
  footerContent,
  headerContent,
  loading = false
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {(title || headerContent) && (
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          {title && (typeof title === 'string' ? <h3 className="font-semibold text-[#0F3460]">{title}</h3> : title)}
          {headerContent && <div className="card-header-content">{headerContent}</div>}
        </div>
      )}
      
      <div className={`p-4 ${contentClassName}`}>
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ) : (
          children
        )}
      </div>
      
      {footerContent && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          {footerContent}
        </div>
      )}
    </div>
  );
};

export default Card;