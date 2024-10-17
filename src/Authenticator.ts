// telegram-webapp.d.ts

export interface UserData {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  photoUrl?: string; 
  initData: string;
  hash: string;
}
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          query_id: string;
          user: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            photoUrl?: string; 
            language_code?: string;
            is_premium?: boolean;
          };
          auth_date: string;
          hash: string;
        };
        ready: () => void;
        close: () => void;
        expand: () => void;
        enableClosingConfirmation: () => void;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
        };
      };
    };
  }
}

export {};

const tg = window.Telegram.WebApp;

// Initialize the WebApp
export function initializeWebApp() {
   try {
    const user = tg.initDataUnsafe.user;
    console.log(user)
    if (!user) {
      console.error('No user data available');
      return null;
    }

    const userData: UserData = {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      languageCode: user.language_code,
      photoUrl: user.photoUrl,
      initData: tg.initData,
      hash: tg.initDataUnsafe.hash
    };
    console.log(userData)
    return userData;
  } catch (error) {
    console.error('Error initializing WebApp:', error);
    return null;
  }

}



