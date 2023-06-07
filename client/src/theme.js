// color design tokens export
export const colorTokens = {
    grey: {
      0: "#FFFFFF",
      10: "#F6F6F6",
      50: "#F0F0F0",
      100: "#E0E0E0",
      200: "#C2C2C2",
      300: "#A3A3A3",
      400: "#858585",
      500: "#666666",
      600: "#4D4D4D",
      700: "#333333",
      800: "#1A1A1A",
      900: "#0A0A0A",
      1000: "#000000",
    },
    primary: {
      50: "#E6FBFF",
      100: "#CCF7FE",
      200: "#99EEFD",
      300: "#66E6FC",
      400: "#33DDFB",
      500: "#00D5FA",
      600: "#00A0BC",
      700: "#006B7D",
      800: "#00353F",
      900: "#001519",
    },
  };
  
  // mui theme settings
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // palette values for dark mode
              primary: {
                dark: colorTokens.primary[200],
                main: colorTokens.primary[500],
                light: colorTokens.primary[800],
              },
              neutral: {
                dark: colorTokens.grey[100],
                main: colorTokens.grey[200],
                mediumMain: colorTokens.grey[300],
                medium: colorTokens.grey[400],
                light: colorTokens.grey[700],
              },
              background: {
                default: colorTokens.grey[900],
                alt: colorTokens.grey[800],
              },
            }
          : {
              // palette values for light mode
              primary: {
                dark: colorTokens.primary[700],
                main: colorTokens.primary[500],
                light: colorTokens.primary[50],
              },
              neutral: {
                dark: colorTokens.grey[700],
                main: colorTokens.grey[500],
                mediumMain: colorTokens.grey[400],
                medium: colorTokens.grey[300],
                light: colorTokens.grey[50],
              },
              background: {
                default: colorTokens.grey[10],
                alt: colorTokens.grey[0],
              },
            }),
      },
      typography: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };



// Different Design

// // color design tokens export
// export const colorTokens = {
//   grey: {
//     0: "#FFFFFF", // White
//     10: "#F6F6F6",
//     50: "#F0F0F0",
//     100: "#E0E0E0",
//     200: "#C2C2C2",
//     300: "#A3A3A3",
//     400: "#858585",
//     500: "#666666",
//     600: "#4D4D4D",
//     700: "#333333",
//     800: "#1A1A1A",
//     900: "#0A0A0A",
//     1000: "#000000",
//   },
//   primary: {
//     50: "#FCE4EC", // Pink 50
//     100: "#F8BBD0", // Pink 100
//     200: "#F48FB1", // Pink 200
//     300: "#F06292", // Pink 300
//     400: "#EC407A", // Pink 400
//     500: "#E91E63", // Pink 500
//     600: "#D81B60", // Pink 600
//     700: "#C2185B", // Pink 700
//     800: "#AD1457", // Pink 800
//     900: "#880E4F", // Pink 900
//   },
// };

// // mui theme settings
// export const themeSettings = (mode) => {
//   return {
//     palette: {
//       mode: mode,
//       primary: {
//         dark: "#00A0BC",
//         main: "#00D5FA",
//         light: "#E6FBFF",
//       },
//       neutral: {
//         dark: "#333333",
//         main: "#666666",
//         mediumMain: "#A3A3A3",
//         medium: "#858585",
//         light: "#F0F0F0",
//       },
//       background: {
//         default: "#F6F6F6",
//         alt: "#FFFFFF",
//       },
//     },
//     typography: {
//       fontFamily: ["Rubik", "sans-serif"].join(","),
//       fontSize: 12,
//       h1: {
//         fontFamily: ["Rubik", "sans-serif"].join(","),
//         fontSize: 40,
//       },
//       h2: {
//         fontFamily: ["Rubik", "sans-serif"].join(","),
//         fontSize: 32,
//       },
//       h3: {
//         fontFamily: ["Rubik", "sans-serif"].join(","),
//         fontSize: 24,
//       },
//       h4: {
//         fontFamily: ["Rubik", "sans-serif"].join(","),
//         fontSize: 20,
//       },
//       h5: {
//         fontFamily: ["Rubik", "sans-serif"].join(","),
//         fontSize: 16,
//       },
//       h6: {
//         fontFamily: ["Rubik", "sans-serif"].join(","),
//         fontSize: 14,
//       },
//     },
//   };
// };
