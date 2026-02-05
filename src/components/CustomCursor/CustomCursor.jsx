import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Check if device supports hover
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasHover) return;

    let animationFrameId;
    
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateFollower = () => {
      setFollowerPosition((prev) => {
        const diffX = position.x - prev.x;
        const diffY = position.y - prev.y;
        return {
          x: prev.x + diffX * 0.2,
          y: prev.y + diffY * 0.2,
        };
      });
      animationFrameId = requestAnimationFrame(updateFollower);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.matches('button, a, [role="button"], .navItem, .socialLink, .cycler')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    animationFrameId = requestAnimationFrame(updateFollower);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [position]);

  return (
    <>
      <div
        className={`cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="cursor-follower"
        style={{
          left: `${followerPosition.x}px`,
          top: `${followerPosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default CustomCursor;
