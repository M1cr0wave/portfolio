// Cursor.js
import React, { useState, useEffect, useRef } from 'react';
import './Cursor.css';

const Cursor = () => {
    // Refs for the dot and ring elements
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    // State for hover effect
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Refs to store position values
        const mousePos = { x: 0, y: 0 };
        const ringPos = { x: 0, y: 0 };
        let animationFrameId;

        const updatePosition = (e) => {
            mousePos.x = e.clientX;
            mousePos.y = e.clientY;
            // Instantly move the dot
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(-50%, -50%) translate(${mousePos.x}px, ${mousePos.y}px)`;
            }
        };

        // The animation loop for the trailing ring
        const animateRing = () => {
            // "Lerp" (linear interpolation) for smooth following
            // The ring's new position is a fraction of the distance to the mouse
            ringPos.x += (mousePos.x - ringPos.x) * 0.2;
            ringPos.y += (mousePos.y - ringPos.y) * 0.2;

            if (ringRef.current) {
                ringRef.current.style.transform = `translate(-50%, -50%) translate(${ringPos.x}px, ${ringPos.y}px)`;
            }
            animationFrameId = requestAnimationFrame(animateRing);
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, .link')) {
                setIsHovered(true);
            }
        };

        const handleMouseOut = (e) => {
            if (e.target.closest('a, button, .link')) {
                setIsHovered(false);
            }
        };

        // Start animation and add listeners
        animateRing();
        window.addEventListener('mousemove', updatePosition);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className={`cursor-dot ${isHovered ? 'hovered' : ''}`} />
            <div ref={ringRef} className={`cursor-ring ${isHovered ? 'hovered' : ''}`} />
        </>
    );
};

export default Cursor;