import { Platform } from "react-native";

const theme = {
  colors: {
    whiteText: "#FFFFFF",
    blueBackgroundColour: "#0366d6",
    mainComponentBackground: "#e1e4e8", 
    redErrorColour: "#d73a4a"
  },
  fontWeights: {
    bold: "700",
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "sans-serif",
      default: "System"
    })
  },
  padding: {
    standardPadding: 5,
    menuBottomPadding: 10,
    menuHorizontalLeftPadding: 15,
    largeButtonPadding: 15
  },
  margins: {
    standardMargin: 5,
    topOrBottomMargin: 2
  },
  smallImage: {
    width: 66,
    height: 58,
    margin: 10
  },
  border: {
    standardBorderRadius: 5,
    standardBorderWidth: 1,
  },
  separator: {
    height: 10
  }
};

export default theme;