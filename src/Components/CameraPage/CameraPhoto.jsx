import React, { useEffect, useState } from 'react';

const CameraPhoto = () => {
    const [screenshotUrl, setScreenshotUrl] = useState(null);

    useEffect(() => {
        //localStorage에서 screenshotUrl을 읽어온다
        const storedScreenshotUrl = localStorage.getItem('screenshotUrl');
        setScreenshotUrl(storedScreenshotUrl);
    }, []); //한 번만 실행되도록 빈 배열을 전달한다

    return (
        <div>
            <h1>촬영된 사진</h1>
            {screenshotUrl && (
                <img src={screenshotUrl} alt="Screenshot" style={{ maxWidth: '100%' }} />
            )}
        </div>
    );
};

export default CameraPhoto;
