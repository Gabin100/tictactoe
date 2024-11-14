import React, { useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import Webcam from 'react-webcam';

const ImageDetection = () => {
  const [base64Image, setBase64Image] = useState(''); // State for base64 image string
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const webcamRef = React.useRef<Webcam>(null);

  const detectPersonInImage = async (imageBase64: string) => {
    if (!imageBase64) return;

    setLoading(true);

    // Reset result before processing
    setResult('');

    const imgElement = new Image();
    imgElement.src = imageBase64;

    imgElement.onload = async () => {
      const model = await cocoSsd.load();
      const predictions = await model.detect(imgElement);

      const personDetected = predictions.some(
        (pred) => pred.class === 'person'
      );

      setResult(personDetected ? 'Person detected!' : 'No person detected.');
      setLoading(false);
    };

    imgElement.onerror = () => {
      setResult('Failed to load the image.');
      setLoading(false);
    };
  };

  // Debugging callback
  React.useEffect(() => {
    console.log('result state updated:', result);
  }, [result]);

  const capture = React.useCallback(async () => {
    if (!webcamRef.current) {
      return null;
    }

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      return null;
    }
    setBase64Image((prevState) => imageSrc);
    await detectPersonInImage(imageSrc);
  }, [webcamRef, base64Image]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Detect a Person in Base64 Image</h2>
      <div className='flex flex-row gap-4'>
        <Webcam
          ref={webcamRef}
          screenshotFormat='image/jpeg'
          width={'300px'}
          style={{
            borderRadius: '10px',
          }}
        />
        {base64Image && (
          <div style={{ borderRadius: '10px' }} className='w-96'>
            <img
              src={base64Image}
              alt='Base64'
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        )}
      </div>
      {loading && <p>Loading...</p>}
      {result && <h3>{result}</h3>}
      <button
        onClick={capture}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Detect Person
      </button>
    </div>
  );
};

export default ImageDetection;
