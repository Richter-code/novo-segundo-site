export const siteConfig = {
  name: 'Agro Mané',
  city: 'Piracicaba-SP',
  whatsappPhone:
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    '5519999990000',
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || '+551933000000',
  supportEmail:
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'contato@agromane.com.br',
  socials: {
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
      'https://www.instagram.com/agropecuariadomane/',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || '',
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || '',
  },
  hours: process.env.NEXT_PUBLIC_BUSINESS_HOURS || 'Seg a Sex - 09:00 às 17:30',
};

export function waLink(message?: string) {
  const text = encodeURIComponent(
    message || 'Olá! Gostaria de informações sobre produtos e serviços.',
  );
  return `https://wa.me/${siteConfig.whatsappPhone}?text=${text}`;
}
