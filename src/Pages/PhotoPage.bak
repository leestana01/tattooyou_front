import React, { useState } from 'react';
import CameraPhoto from '../Components/CameraPage/CameraPhoto';

const PhotoPage = () => {
    const [screenshotUrl, setScreenshotUrl] = useState(null);

    const handleScreenshotTaken = (url) => {
        setScreenshotUrl(url);
    };

    return (
        <div>
            <Component onScreenshotTaken={handleScreenshotTaken} />
            {screenshotUrl && <CameraPhoto screenshotUrl={screenshotUrl} />}
        </div>
    );
};

export default PhotoPage;
