import { useTranslation } from "react-i18next";

/**
 * Custom hook for translations
 *
 * Usage example:
 *
 * ```tsx
 * import { useTranslate } from '@/hooks/useTranslate';
 *
 * const MyComponent = () => {
 *   const t = useTranslate();
 *
 *   return (
 *     <View>
 *       <Text>{t('common.welcome')}</Text>
 *       <Text>{t('navigation.home')}</Text>
 *     </View>
 *   );
 * };
 * ```
 */
export const useTranslate = () => {
  const { t } = useTranslation();
  return t;
};

export default useTranslate;
