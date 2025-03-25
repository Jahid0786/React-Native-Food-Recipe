// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect, useState } from "react";
// import Animated from "react-native-reanimated";

// const CacheImage = (props) => {
//   const [cachedSource, setCachedSource] = useState(null);
//   const { uri } = props;

//   useEffect(() => {
//     const getCachedImage = async () => {
//       try {
//         const cacheImageData = await AsyncStorage.getItem(uri);
//         if (cacheImageData) {
//           setCachedSource({ uri: cacheImageData });
//         } else {
//           const response = await fetch(uri);
//           const imgBlob = await response.blob();
//           const base64Data = await new Promise((resolve) => {
//             const render = new FileReader();
//             render.readAsDataURL(imgBlob);
//             render.onloadend = () => {
//               resolve(render.result);
//             };
//           });

//           await AsyncStorage.setItem(uri, base64Data);
//           setCachedSource({ uri: base64Data });
//         }
//       } catch (error) {
//         console.log("Error caching image", error);
//         setCachedSource(uri);
//       }
//     };

//     getCachedImage();
//   }, []);

//   return <Animated.Image source={cachedSource} {...props} />;
// };

// export default CacheImage;

import { useEffect, useState } from "react";
import { Image } from "react-native";
import Animated from "react-native-reanimated";

const CacheImage = ({ uri, ...props }) => {
  const [cachedUri, setCachedUri] = useState(null);

  useEffect(() => {
    const cacheImage = async () => {
      try {
        // Prefetch image to cache
        await Image.prefetch(uri);
        setCachedUri(uri);
      } catch (error) {
        console.error("Error caching image:", error);
        setCachedUri(uri);
      }
    };

    cacheImage();
  }, [uri]);

  return <Animated.Image source={{ uri: cachedUri }} {...props} />;
};

export default CacheImage;
