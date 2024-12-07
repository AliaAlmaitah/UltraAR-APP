import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { 
  ViroARScene, 
  ViroARSceneNavigator, 
  Viro3DObject,
  ViroMaterials,
  ViroARTrackingTargets,
  ViroARImageMarker,
} from '@reactvision/react-viro';

interface AnchorData {
  position: [number, number, number];
}

interface PathPoint {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  instruction: string;
}

const UltrasoundPaths = {
  cardiac: [
    { 
      xMin: -0.5, xMax: 0.1,
      yMin: -0.6, yMax: -0.3,
      instruction: "Start at center of chest" 
    },
    { 
      xMin: -0.2, xMax: 0.0,
      yMin: -0.6, yMax: -0.3,
      instruction: "Move left to heart position" 
    },
    { 
      xMin: -0.2, xMax: 0.0,
      yMin: -0.5, yMax: -0.2,
      instruction: "Move up for better angle" 
    },
  ],
  abdominal: [
    { 
      xMin: -0.1, xMax: 0.1,
      yMin: -0.5, yMax: -0.2,
      instruction: "Start at center" 
    },
    { 
      xMin: 0.1, xMax: 0.2,
      yMin: -0.6, yMax: -0.3,
      instruction: "Move right slightly" 
    },
    { 
      xMin: 0.0, xMax: 0.2,
      yMin: -0.7, yMax: -0.4,
      instruction: "Move down to liver" 
    },
  ],
  vascular: [
    { 
      xMin: -0.1, xMax: 0.6,
      yMin: -0.6, yMax: -0.3,
      instruction: "Start at center" 
    },
    { 
      xMin: -0.2, xMax: 0.0,
      yMin: -0.6, yMax: -0.3,
      instruction: "Move left to find vessel" 
    },
    { 
      xMin: -0.2, xMax: 0.0,
      yMin: -0.5, yMax: -0.2,
      instruction: "Adjust upward slightly" 
    },
  ]
};

const ARScene: React.FC = () => {
  const [showARScene, setShowARScene] = useState(false);
  const [selectedPath, setSelectedPath] = useState<PathPoint[]>([]);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [stablePositionTime, setStablePositionTime] = useState<number | null>(null);
  const isTracking = useRef(false);
  const currentDirection = useRef<'left' | 'right' | 'up' | 'down' | 'none'>('none');
  const [debugText, setDebugText] = useState("Select ultrasound type");
  const [selectedType, setSelectedType] = useState<string>("");
  const [positionText, setPositionText] = useState("");
  const [isInCorrectPosition, setIsInCorrectPosition] = useState(false);
  const STABILITY_DURATION = 1000; // 2 seconds to hold position

  ViroMaterials.createMaterials({
    greenArrow: {
      diffuseColor: '#00FF00',
      lightingModel: "Constant",
      shininess: 2.0,
    }
  });

  const handleUltrasoundSelection = (type: 'cardiac' | 'abdominal' | 'vascular') => {
    setSelectedType(type);
    setSelectedPath(UltrasoundPaths[type]);
    setCurrentPathIndex(0);
    setDebugText(UltrasoundPaths[type][0].instruction);
    setShowARScene(true);
    setIsInCorrectPosition(false);
  };

  ViroARTrackingTargets.createTargets({
    "targetOne": {
      source: require('../assets/imagetest.png'),
      orientation: "Up",
      physicalWidth: 0.1,
      type: 'Image'
    },
  });

  const onAnchorFound = (anchor: AnchorData) => {
    const [x, y] = anchor.position;
    console.log("Anchor Found - X:", x, "Y:", y);
    isTracking.current = true;
    checkPosition(x, y);
  };

  const onAnchorUpdated = (anchor: AnchorData) => {
    const [x, y] = anchor.position;
    console.log("Anchor Updated - X:", x, "Y:", y);
    // setPositionText(`X: ${x.toFixed(3)}, Y: ${y.toFixed(3)}`);
    checkPosition(x, y);
  };

  const checkPosition = (x: number, y: number) => {
    if (!selectedPath || currentPathIndex >= selectedPath.length || !selectedPath[currentPathIndex]) {
      setDebugText("Scan complete!");
      setIsInCorrectPosition(true);
      return;
    }

    const currentTarget = selectedPath[currentPathIndex];
    const isInXRange = x >= currentTarget.xMin && x <= currentTarget.xMax;
    const isInYRange = y >= currentTarget.yMin && y <= currentTarget.yMax;

    if (isInXRange && isInYRange) {
      setIsInCorrectPosition(true);
      const currentTime = Date.now();

      if (!stablePositionTime) {
        setStablePositionTime(currentTime);
        setDebugText(`Hold position...`);
      } else if (currentTime - stablePositionTime >= STABILITY_DURATION) {
        currentDirection.current = 'none';
        if (currentPathIndex < selectedPath.length - 1) {
          setDebugText(`Position locked! Moving to next step...`);
          setCurrentPathIndex(prev => prev + 1);
          setStablePositionTime(null);
          setIsInCorrectPosition(false);
        } else {
          setDebugText(`${selectedType.toUpperCase()} scan complete!`);
        }
      }
    } else {
      setIsInCorrectPosition(false);
      setStablePositionTime(null);
      if (!isInXRange) {
        if (x < currentTarget.xMin) {
          currentDirection.current = 'right';
          setDebugText(currentTarget?.instruction + " - Move Right");
        } else if (x > currentTarget.xMax) {
          currentDirection.current = 'left';
          setDebugText(currentTarget?.instruction + " - Move Left");
        }
      }
      if (!isInYRange) {
        if (y < currentTarget.yMin) {
          currentDirection.current = 'up';
          setDebugText(currentTarget?.instruction + " - Move Up");
        } else if (y > currentTarget.yMax) {
          currentDirection.current = 'down';
          setDebugText(currentTarget?.instruction + " - Move Down");
        }
      }
    }
  };


  const onAnchorRemoved = () => {
    console.log("Anchor Removed");
    isTracking.current = false;
    currentDirection.current = 'none';
    setStablePositionTime(null);
    setPositionText("");
    setIsInCorrectPosition(false);
    if (selectedPath && selectedPath.length > 0) {
      setDebugText(`Find target - ${selectedPath[currentPathIndex].instruction}`);
    }
  };

  const SelectionScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Select Ultrasound Type</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => handleUltrasoundSelection('cardiac')}
      >
        <Text style={styles.buttonText}>Cardiac</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => handleUltrasoundSelection('abdominal')}
      >
        <Text style={styles.buttonText}>Abdominal</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => handleUltrasoundSelection('vascular')}
      >
        <Text style={styles.buttonText}>Vascular</Text>
      </TouchableOpacity>
    </View>
  );

  const ARContent = () => {
    return (
      <ViroARScene>
        <ViroARImageMarker 
          target={"targetOne"}
          onAnchorFound={onAnchorFound}
          onAnchorUpdated={onAnchorUpdated}
          onAnchorRemoved={onAnchorRemoved}
        >
          {['right', 'left', 'up', 'down'].map((direction) => (
            currentDirection.current === direction && (
              <Viro3DObject
                key={direction}
                source={require('../assets/arrow.obj')}
                position={direction === 'right' ? [0.075, 0.05, 0] :
                         direction === 'left' ? [-0.075, 0.05, 0] :
                         direction === 'up' ? [0, 0.075, 0] :
                         [0, -0.075, 0]}
                scale={[0.03, 0.03, 0.03]}
                rotation={direction === 'right' ? [0, -90, 0] :
                         direction === 'left' ? [0, 45, 0] :
                         direction === 'up' ? [0, 180, 90] :
                         [0, 0, -90]}
                materials={["greenArrow"]}
                type="OBJ"
                visible={isTracking.current}
              />
            )
          ))}
        </ViroARImageMarker>
      </ViroARScene>
    );
  };

  const Overlays = () => (
    <>
      <View style={styles.overlayContainer} pointerEvents="none">
        <View style={[styles.notificationBox, { borderColor: isInCorrectPosition ? '#00ff00' : '#ff0000' }]}>
          <Text style={[styles.instructionText, { color: isInCorrectPosition ? '#00ff00' : '#ff0000' }]}>
            {debugText}
          </Text>
        </View>
      </View>

      {/* <View style={styles.positionOverlay} pointerEvents="none">
        <View style={styles.positionBox}>
          <Text style={styles.positionText}>{positionText}</Text>
        </View>
      </View> */}
    </>
  );

  const styles = StyleSheet.create({
    arNavigator: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000000',
    },
    title: {
      fontSize: 24,
      color: '#ffffff',
      marginBottom: 30,
    },
    button: {
      backgroundColor: '#007AFF',
      padding: 15,
      borderRadius: 10,
      width: '80%',
      marginVertical: 10,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 18,
      textAlign: 'center',
    },
    overlayContainer: {
      position: 'absolute',
      top: 50,
      left: 0,
      right: 0,
      alignItems: 'center',
      zIndex: 1000,
    },
    notificationBox: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: 15,
      borderRadius: 10,
      margin: 10,
      maxWidth: '90%',
      borderWidth: 1,
    },
    instructionText: {
      fontSize: 16,
      textAlign: 'center',
    },
    positionOverlay: {
      position: 'absolute',
      bottom: 30,
      left: 0,
      right: 0,
      alignItems: 'center',
      zIndex: 1000,
    },
    positionBox: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#00ff00',
    },
    positionText: {
      color: '#00ff00',
      fontSize: 14,
      textAlign: 'center',
    },
  });

  return showARScene ? (
    <>
      <ViroARSceneNavigator
        initialScene={{
          scene: ARContent,
        }}
        autofocus={true}
        worldAlignment="Camera"
        style={styles.arNavigator}
      />
      <Overlays />
    </>
  ) : (
    <SelectionScreen />
  );
};

export default ARScene;