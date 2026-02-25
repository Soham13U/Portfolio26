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
      
      // Check if target or any parent has data-clickable attribute or mainTitle class
      const hasClickableAttribute = target.matches('[data-clickable]') || 
                                    target.closest('[data-clickable]') !== null;
      
      // Check if target or any parent has mainTitle class (for the heading)
      const mainTitleElement = target.closest('h1.mainTitle');
      const hasMainTitle = target.matches('.mainTitle') || 
                          target.matches('.letter') ||
                          mainTitleElement !== null;
      
      // Check for other clickable elements
      const isClickable = 
        target.matches('button, a, [role="button"]') ||
        target.closest('button, a, [role="button"]') ||
        target.matches('.navItem, .socialLink, .cycler, .projectLink, .progressItem') ||
        target.closest('.navItem, .socialLink, .cycler, .projectLink, .progressItem') ||
        hasClickableAttribute ||
        hasMainTitle ||
        window.getComputedStyle(target).cursor === 'pointer' ||
        (target.closest('*') && window.getComputedStyle(target.closest('*')).cursor === 'pointer');
      
      setIsHovering(isClickable);
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
        }}
      />
      <div
        className={`cursor-follower ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${followerPosition.x}px`,
          top: `${followerPosition.y}px`,
        }}
      />
    </>
  );
};

export default CustomCursor;
