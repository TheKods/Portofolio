import React from 'react';
import Squares from './Squares';

const Background = () => {
	return (
		<div className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden">
			<Squares 
				speed={0.5} 
				squareSize={25}
				direction='diagonal'
				borderColor='rgba(99, 102, 241, 0.8)' // Much higher opacity for indigo color
				hoverFillColor='rgba(168, 85, 247, 0.6)' // Higher opacity for purple color
			/>
		</div>
	);
};

export default Background;

