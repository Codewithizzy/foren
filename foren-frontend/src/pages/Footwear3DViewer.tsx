import { Box, Typography, Slider, ButtonGroup, Button } from '@mui/material';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useState, useRef } from 'react';

function FootwearModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const { camera } = useThree();
  camera.position.z = 5;
  return <primitive object={scene} />;
}

export const Footwear3DViewer = () => {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const modelRef = useRef<any>();

  return (
    <Box sx={{ height: '600px', border: '1px solid #ddd', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom sx={{ p: 2 }}>
        3D Footwear Reconstruction
      </Typography>
      
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <FootwearModel url="/models/footwear.glb" />
        <OrbitControls />
      </Canvas>

      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography gutterBottom>Rotation</Typography>
          <Slider
            value={rotation}
            onChange={(e, val) => {
              setRotation(val as number);
              if (modelRef.current) modelRef.current.rotation.y = val;
            }}
            min={0}
            max={Math.PI * 2}
            step={0.1}
          />
        </Box>

        <Box>
          <Typography gutterBottom>Scale</Typography>
          <Slider
            value={scale}
            onChange={(e, val) => {
              setScale(val as number);
              if (modelRef.current) modelRef.current.scale.set(val, val, val);
            }}
            min={0.5}
            max={2}
            step={0.1}
          />
        </Box>

        <ButtonGroup variant="outlined">
          <Button>Take Measurement</Button>
          <Button>Compare With Suspect</Button>
          <Button>Export Model</Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};