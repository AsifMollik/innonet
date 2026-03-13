'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'bn' | 'hi' | 'ur' | 'zh' | 'es' | 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Landing Page
    'hero.title': 'Innovation Networking Platform',
    'hero.subtitle': 'Connect. Innovate. Grow.',
    'hero.description': 'A dedicated social platform for Bangladeshi entrepreneurs, startup founders, and innovators. Share ideas, find mentors, and build the future together.',
    'button.joinFree': 'Join Free',
    'button.signIn': 'Sign In',
    'stats.entrepreneurs': 'Entrepreneurs',
    'stats.startups': 'Startups',
    'stats.investors': 'Investors',
    
    // Navigation
    'nav.home': 'Home',
    'nav.feed': 'Feed',
    'nav.messages': 'Messages',
    'nav.notifications': 'Notifications',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.help': 'Help & Support',
    'nav.logout': 'Log Out',
    
    // Feed
    'feed.createPost': 'Create Post',
    'feed.whatsOnMind': "What's on your mind?",
    'feed.post': 'Post',
    'feed.filters.all': 'All Posts',
    'feed.filters.funding': 'Funding',
    'feed.filters.ideas': 'Ideas',
    'feed.filters.events': 'Events',
    'feed.filters.collaboration': 'Collaboration',
    
    // Post Actions
    'post.like': 'Like',
    'post.comment': 'Comment',
    'post.share': 'Share',
    'post.save': 'Save',
    
    // Profile
    'profile.viewProfile': 'View your profile',
    'profile.accountPreferences': 'Account preferences',
    'profile.getHelp': 'Get help',
    
    // Footer
    'footer.about': 'About',
    'footer.careers': 'Careers',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.help': 'Help',
  },
  bn: {
    // Landing Page
    'hero.title': 'ইনোভেশন নেটওয়ার্কিং প্ল্যাটফর্ম',
    'hero.subtitle': 'সংযুক্ত হন। উদ্ভাবন করুন। বৃদ্ধি করুন।',
    'hero.description': 'বাংলাদেশী উদ্যোক্তা, স্টার্টআপ প্রতিষ্ঠাতা এবং উদ্ভাবকদের জন্য একটি নিবেদিত সামাজিক প্ল্যাটফর্ম। ধারণা শেয়ার করুন, পরামর্শদাতা খুঁজুন এবং একসাথে ভবিষ্যত তৈরি করুন।',
    'button.joinFree': 'বিনামূল্যে যোগ দিন',
    'button.signIn': 'সাইন ইন',
    'stats.entrepreneurs': 'উদ্যোক্তা',
    'stats.startups': 'স্টার্টআপ',
    'stats.investors': 'বিনিয়োগকারী',
    
    // Navigation
    'nav.home': 'হোম',
    'nav.feed': 'ফিড',
    'nav.messages': 'বার্তা',
    'nav.notifications': 'বিজ্ঞপ্তি',
    'nav.profile': 'প্রোফাইল',
    'nav.settings': 'সেটিংস',
    'nav.help': 'সাহায্য ও সহায়তা',
    'nav.logout': 'লগ আউট',
    
    // Feed
    'feed.createPost': 'পোস্ট তৈরি করুন',
    'feed.whatsOnMind': 'আপনার মনে কি আছে?',
    'feed.post': 'পোস্ট',
    'feed.filters.all': 'সব পোস্ট',
    'feed.filters.funding': 'তহবিল',
    'feed.filters.ideas': 'ধারণা',
    'feed.filters.events': 'ইভেন্ট',
    'feed.filters.collaboration': 'সহযোগিতা',
    
    // Post Actions
    'post.like': 'পছন্দ',
    'post.comment': 'মন্তব্য',
    'post.share': 'শেয়ার',
    'post.save': 'সংরক্ষণ',
    
    // Profile
    'profile.viewProfile': 'আপনার প্রোফাইল দেখুন',
    'profile.accountPreferences': 'অ্যাকাউন্ট পছন্দ',
    'profile.getHelp': 'সাহায্য পান',
    
    // Footer
    'footer.about': 'সম্পর্কে',
    'footer.careers': 'ক্যারিয়ার',
    'footer.privacy': 'গোপনীয়তা',
    'footer.terms': 'শর্তাবলী',
    'footer.help': 'সাহায্য',
  },
  hi: {
    // Landing Page
    'hero.title': 'इनोवेशन नेटवर्किंग प्लेटफॉर्म',
    'hero.subtitle': 'जुड़ें। नवाचार करें। बढ़ें।',
    'hero.description': 'बांग्लादेशी उद्यमियों, स्टार्टअप संस्थापकों और नवप्रवर्तकों के लिए एक समर्पित सामाजिक मंच। विचार साझा करें, सलाहकार खोजें और एक साथ भविष्य बनाएं।',
    'button.joinFree': 'मुफ्त में शामिल हों',
    'button.signIn': 'साइन इन',
    'stats.entrepreneurs': 'उद्यमी',
    'stats.startups': 'स्टार्टअप',
    'stats.investors': 'निवेशक',
    
    // Navigation
    'nav.home': 'होम',
    'nav.feed': 'फीड',
    'nav.messages': 'संदेश',
    'nav.notifications': 'सूचनाएं',
    'nav.profile': 'प्रोफाइल',
    'nav.settings': 'सेटिंग्स',
    'nav.help': 'सहायता और समर्थन',
    'nav.logout': 'लॉग आउट',
    
    // Feed
    'feed.createPost': 'पोस्ट बनाएं',
    'feed.whatsOnMind': 'आपके मन में क्या है?',
    'feed.post': 'पोस्ट',
    'feed.filters.all': 'सभी पोस्ट',
    'feed.filters.funding': 'फंडिंग',
    'feed.filters.ideas': 'विचार',
    'feed.filters.events': 'इवेंट',
    'feed.filters.collaboration': 'सहयोग',
    
    // Post Actions
    'post.like': 'पसंद',
    'post.comment': 'टिप्पणी',
    'post.share': 'शेयर',
    'post.save': 'सहेजें',
    
    // Profile
    'profile.viewProfile': 'अपनी प्रोफाइल देखें',
    'profile.accountPreferences': 'खाता प्राथमिकताएं',
    'profile.getHelp': 'सहायता प्राप्त करें',
    
    // Footer
    'footer.about': 'के बारे में',
    'footer.careers': 'करियर',
    'footer.privacy': 'गोपनीयता',
    'footer.terms': 'शर्तें',
    'footer.help': 'सहायता',
  },
  ur: {
    // Landing Page
    'hero.title': 'انوویشن نیٹ ورکنگ پلیٹ فارم',
    'hero.subtitle': 'جڑیں۔ جدت کریں۔ بڑھیں۔',
    'hero.description': 'بنگلہ دیشی کاروباریوں، اسٹارٹ اپ بانیوں اور جدت پسندوں کے لیے ایک وقف سماجی پلیٹ فارم۔ خیالات شیئر کریں، رہنما تلاش کریں اور مل کر مستقبل بنائیں۔',
    'button.joinFree': 'مفت میں شامل ہوں',
    'button.signIn': 'سائن ان',
    'stats.entrepreneurs': 'کاروباری',
    'stats.startups': 'اسٹارٹ اپس',
    'stats.investors': 'سرمایہ کار',
    
    // Navigation
    'nav.home': 'ہوم',
    'nav.feed': 'فیڈ',
    'nav.messages': 'پیغامات',
    'nav.notifications': 'اطلاعات',
    'nav.profile': 'پروفائل',
    'nav.settings': 'ترتیبات',
    'nav.help': 'مدد اور معاونت',
    'nav.logout': 'لاگ آؤٹ',
    
    // Feed
    'feed.createPost': 'پوسٹ بنائیں',
    'feed.whatsOnMind': 'آپ کے ذہن میں کیا ہے؟',
    'feed.post': 'پوسٹ',
    'feed.filters.all': 'تمام پوسٹس',
    'feed.filters.funding': 'فنڈنگ',
    'feed.filters.ideas': 'خیالات',
    'feed.filters.events': 'تقریبات',
    'feed.filters.collaboration': 'تعاون',
    
    // Post Actions
    'post.like': 'پسند',
    'post.comment': 'تبصرہ',
    'post.share': 'شیئر',
    'post.save': 'محفوظ کریں',
    
    // Profile
    'profile.viewProfile': 'اپنی پروفائل دیکھیں',
    'profile.accountPreferences': 'اکاؤنٹ ترجیحات',
    'profile.getHelp': 'مدد حاصل کریں',
    
    // Footer
    'footer.about': 'کے بارے میں',
    'footer.careers': 'کیریئر',
    'footer.privacy': 'رازداری',
    'footer.terms': 'شرائط',
    'footer.help': 'مدد',
  },
  zh: {
    // Landing Page
    'hero.title': '创新网络平台',
    'hero.subtitle': '连接。创新。成长。',
    'hero.description': '为孟加拉国企业家、初创公司创始人和创新者提供的专用社交平台。分享想法，寻找导师，共同创造未来。',
    'button.joinFree': '免费加入',
    'button.signIn': '登录',
    'stats.entrepreneurs': '企业家',
    'stats.startups': '初创公司',
    'stats.investors': '投资者',
    
    // Navigation
    'nav.home': '首页',
    'nav.feed': '动态',
    'nav.messages': '消息',
    'nav.notifications': '通知',
    'nav.profile': '个人资料',
    'nav.settings': '设置',
    'nav.help': '帮助与支持',
    'nav.logout': '退出',
    
    // Feed
    'feed.createPost': '创建帖子',
    'feed.whatsOnMind': '你在想什么？',
    'feed.post': '发布',
    'feed.filters.all': '所有帖子',
    'feed.filters.funding': '资金',
    'feed.filters.ideas': '想法',
    'feed.filters.events': '活动',
    'feed.filters.collaboration': '合作',
    
    // Post Actions
    'post.like': '喜欢',
    'post.comment': '评论',
    'post.share': '分享',
    'post.save': '保存',
    
    // Profile
    'profile.viewProfile': '查看您的个人资料',
    'profile.accountPreferences': '账户偏好',
    'profile.getHelp': '获取帮助',
    
    // Footer
    'footer.about': '关于',
    'footer.careers': '职业',
    'footer.privacy': '隐私',
    'footer.terms': '条款',
    'footer.help': '帮助',
  },
  es: {
    // Landing Page
    'hero.title': 'Plataforma de Redes de Innovación',
    'hero.subtitle': 'Conectar. Innovar. Crecer.',
    'hero.description': 'Una plataforma social dedicada para emprendedores, fundadores de startups e innovadores de Bangladesh. Comparte ideas, encuentra mentores y construye el futuro juntos.',
    'button.joinFree': 'Únete Gratis',
    'button.signIn': 'Iniciar Sesión',
    'stats.entrepreneurs': 'Emprendedores',
    'stats.startups': 'Startups',
    'stats.investors': 'Inversores',
    
    // Navigation
    'nav.home': 'Inicio',
    'nav.feed': 'Feed',
    'nav.messages': 'Mensajes',
    'nav.notifications': 'Notificaciones',
    'nav.profile': 'Perfil',
    'nav.settings': 'Configuración',
    'nav.help': 'Ayuda y Soporte',
    'nav.logout': 'Cerrar Sesión',
    
    // Feed
    'feed.createPost': 'Crear Publicación',
    'feed.whatsOnMind': '¿Qué estás pensando?',
    'feed.post': 'Publicar',
    'feed.filters.all': 'Todas las Publicaciones',
    'feed.filters.funding': 'Financiación',
    'feed.filters.ideas': 'Ideas',
    'feed.filters.events': 'Eventos',
    'feed.filters.collaboration': 'Colaboración',
    
    // Post Actions
    'post.like': 'Me gusta',
    'post.comment': 'Comentar',
    'post.share': 'Compartir',
    'post.save': 'Guardar',
    
    // Profile
    'profile.viewProfile': 'Ver tu perfil',
    'profile.accountPreferences': 'Preferencias de cuenta',
    'profile.getHelp': 'Obtener ayuda',
    
    // Footer
    'footer.about': 'Acerca de',
    'footer.careers': 'Carreras',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
    'footer.help': 'Ayuda',
  },
  fr: {
    // Landing Page
    'hero.title': 'Plateforme de Réseautage d\'Innovation',
    'hero.subtitle': 'Connecter. Innover. Grandir.',
    'hero.description': 'Une plateforme sociale dédiée aux entrepreneurs, fondateurs de startups et innovateurs bangladais. Partagez des idées, trouvez des mentors et construisez l\'avenir ensemble.',
    'button.joinFree': 'Rejoindre Gratuitement',
    'button.signIn': 'Se Connecter',
    'stats.entrepreneurs': 'Entrepreneurs',
    'stats.startups': 'Startups',
    'stats.investors': 'Investisseurs',
    
    // Navigation
    'nav.home': 'Accueil',
    'nav.feed': 'Fil',
    'nav.messages': 'Messages',
    'nav.notifications': 'Notifications',
    'nav.profile': 'Profil',
    'nav.settings': 'Paramètres',
    'nav.help': 'Aide et Support',
    'nav.logout': 'Déconnexion',
    
    // Feed
    'feed.createPost': 'Créer une Publication',
    'feed.whatsOnMind': 'À quoi pensez-vous?',
    'feed.post': 'Publier',
    'feed.filters.all': 'Toutes les Publications',
    'feed.filters.funding': 'Financement',
    'feed.filters.ideas': 'Idées',
    'feed.filters.events': 'Événements',
    'feed.filters.collaboration': 'Collaboration',
    
    // Post Actions
    'post.like': 'J\'aime',
    'post.comment': 'Commenter',
    'post.share': 'Partager',
    'post.save': 'Enregistrer',
    
    // Profile
    'profile.viewProfile': 'Voir votre profil',
    'profile.accountPreferences': 'Préférences du compte',
    'profile.getHelp': 'Obtenir de l\'aide',
    
    // Footer
    'footer.about': 'À propos',
    'footer.careers': 'Carrières',
    'footer.privacy': 'Confidentialité',
    'footer.terms': 'Conditions',
    'footer.help': 'Aide',
  },
  ar: {
    // Landing Page
    'hero.title': 'منصة شبكات الابتكار',
    'hero.subtitle': 'اتصل. ابتكر. انمو.',
    'hero.description': 'منصة اجتماعية مخصصة لرواد الأعمال البنغلاديشيين ومؤسسي الشركات الناشئة والمبتكرين. شارك الأفكار، ابحث عن الموجهين، وابنِ المستقبل معًا.',
    'button.joinFree': 'انضم مجانًا',
    'button.signIn': 'تسجيل الدخول',
    'stats.entrepreneurs': 'رواد الأعمال',
    'stats.startups': 'الشركات الناشئة',
    'stats.investors': 'المستثمرون',
    
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.feed': 'الأخبار',
    'nav.messages': 'الرسائل',
    'nav.notifications': 'الإشعارات',
    'nav.profile': 'الملف الشخصي',
    'nav.settings': 'الإعدادات',
    'nav.help': 'المساعدة والدعم',
    'nav.logout': 'تسجيل الخروج',
    
    // Feed
    'feed.createPost': 'إنشاء منشور',
    'feed.whatsOnMind': 'ما الذي يدور في ذهنك؟',
    'feed.post': 'نشر',
    'feed.filters.all': 'جميع المنشورات',
    'feed.filters.funding': 'التمويل',
    'feed.filters.ideas': 'الأفكار',
    'feed.filters.events': 'الفعاليات',
    'feed.filters.collaboration': 'التعاون',
    
    // Post Actions
    'post.like': 'إعجاب',
    'post.comment': 'تعليق',
    'post.share': 'مشاركة',
    'post.save': 'حفظ',
    
    // Profile
    'profile.viewProfile': 'عرض ملفك الشخصي',
    'profile.accountPreferences': 'تفضيلات الحساب',
    'profile.getHelp': 'احصل على المساعدة',
    
    // Footer
    'footer.about': 'حول',
    'footer.careers': 'الوظائف',
    'footer.privacy': 'الخصوصية',
    'footer.terms': 'الشروط',
    'footer.help': 'المساعدة',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Update HTML dir attribute for RTL languages
    if (lang === 'ar' || lang === 'ur') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
