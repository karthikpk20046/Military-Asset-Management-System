import React from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: number;
  onClick?: () => void;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  onClick,
  className = ''
}) => {
  const showTrend = change !== undefined;
  const isPositive = change !== undefined && change >= 0;
  
  return (
    <Card 
      className={`hover:shadow-lg transition-shadow ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {showTrend && (
            <div className="flex items-center mt-2">
              {isPositive ? (
                <TrendingUp size={16} className="text-green-500 mr-1" />
              ) : (
                <TrendingDown size={16} className="text-red-500 mr-1" />
              )}
              <span className={`text-xs font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? '+' : ''}{change}% from last month
              </span>
            </div>
          )}
        </div>
        
        <div className="bg-[#0F3460]/10 p-3 rounded-lg">
          {icon || <ArrowRight size={20} className="text-[#0F3460]" />}
        </div>
      </div>
      
      {onClick && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-sm text-[#0F3460] font-medium">
          <span>View details</span>
          <ArrowRight size={16} className="ml-2" />
        </div>
      )}
    </Card>
  );
};

export default StatCard;