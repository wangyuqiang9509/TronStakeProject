import { createTheme } from '@mui/material/styles';

// TRON品牌颜色
const tronColors = {
  primary: '#EE3823', // TRON红色
  secondary: '#141414', // 深黑色
  accent: '#FF6B35', // 橙色
  background: '#0A0A0A', // 深色背景
  surface: '#1A1A1A', // 表面颜色
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
};

// 创建主题
export const theme = createTheme({
  palette: {
    mode: 'dark', // 使用深色模式
    primary: {
      main: tronColors.primary,
      light: '#FF5B4A',
      dark: '#C72E1B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: tronColors.secondary,
      light: '#424242',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    background: {
      default: tronColors.background,
      paper: tronColors.surface,
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
    success: {
      main: tronColors.success,
    },
    warning: {
      main: tronColors.warning,
    },
    error: {
      main: tronColors.error,
    },
    info: {
      main: tronColors.info,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#FFFFFF',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#FFFFFF',
    },
    body1: {
      fontSize: '1rem',
      color: '#FFFFFF',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#B0B0B0',
    },
  },
  components: {
    // 自定义按钮样式
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        containedPrimary: {
          background: `linear-gradient(45deg, ${tronColors.primary} 30%, ${tronColors.accent} 90%)`,
          boxShadow: '0 3px 5px 2px rgba(238, 56, 35, .3)',
          '&:hover': {
            background: `linear-gradient(45deg, ${tronColors.primary} 60%, ${tronColors.accent} 100%)`,
          },
        },
      },
    },
    // 自定义卡片样式
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: tronColors.surface,
          border: `1px solid ${tronColors.secondary}`,
          borderRadius: 12,
        },
      },
    },
    // 自定义输入框样式
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: tronColors.secondary,
            },
            '&:hover fieldset': {
              borderColor: tronColors.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: tronColors.primary,
            },
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});

export default theme; 