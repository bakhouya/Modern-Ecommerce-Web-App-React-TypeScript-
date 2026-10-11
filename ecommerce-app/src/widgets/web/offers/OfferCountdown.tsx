
import React, { useState, useEffect } from 'react';

interface Props {
  targetDate: string | Date; 
  onComplete?: () => void;   
  compact?: boolean;         
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const OfferCountdown: React.FC<Props> = ({ targetDate, onComplete, compact = false, className = ''}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = target.getTime() - now;

      if (difference <= 0) {
        setIsExpired(true);
        if (onComplete) onComplete();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    // Calcul initial
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(calculateTimeLeft());

    // Mise à jour chaque seconde
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  // Si l'offre est expirée, on affiche un message
  if (isExpired) {
    return (
      <div className={`offer-countdown expired ${className}`}>
        <span className="offer-countdown__expired-text">Offre expirée</span>
      </div>
    );
  }

  // Formatage des nombres (toujours 2 chiffres)
  const format = (num: number) => String(num).padStart(2, '0');

  // Si version compacte (pour mobile ou header)
  if (compact) {
    return (
      <div className={`offer-countdown offer-countdown--compact ${className}`}>
        <div className="offer-countdown__item">
          <span className="offer-countdown__value">{format(timeLeft.days)}</span>
          <span className="offer-countdown__label">j</span>
        </div>
        <span className="offer-countdown__separator">:</span>
        <div className="offer-countdown__item">
          <span className="offer-countdown__value">{format(timeLeft.hours)}</span>
          <span className="offer-countdown__label">h</span>
        </div>
        <span className="offer-countdown__separator">:</span>
        <div className="offer-countdown__item">
          <span className="offer-countdown__value">{format(timeLeft.minutes)}</span>
          <span className="offer-countdown__label">m</span>
        </div>
        <span className="offer-countdown__separator">:</span>
        <div className="offer-countdown__item">
          <span className="offer-countdown__value">{format(timeLeft.seconds)}</span>
          <span className="offer-countdown__label">s</span>
        </div>
      </div>
    );
  }

  // Version complète avec style "cartes"
  return (
    <div className={`offer-countdown ${className}`}>
      <div className="offer-countdown__label-top">🔥 L'offre se termine dans</div>
      <div className="offer-countdown__items">
        <div className="offer-countdown__item">
          <span className="offer-countdown__value">{format(timeLeft.days)}</span>
          <span className="offer-countdown__label">Jours</span>
        </div>
        <div className="offer-countdown__item">
          <span className="offer-countdown__value">{format(timeLeft.hours)}</span>
          <span className="offer-countdown__label">Heures</span>
        </div>
        <div className="offer-countdown__item">
          <span className="offer-countdown__value">{format(timeLeft.minutes)}</span>
          <span className="offer-countdown__label">Minutes</span>
        </div>
        <div className="offer-countdown__item">
          <span className="offer-countdown__value">{format(timeLeft.seconds)}</span>
          <span className="offer-countdown__label">Secondes</span>
        </div>
      </div>
    </div>
  );
};

export default OfferCountdown;



