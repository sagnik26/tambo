import type { ContextHelperFn } from "@tambo-ai/react";

/**
 * React Native context helper that provides current route information
 * Works with React Navigation
 *
 * @example
 * ```tsx
 * import { useRoute } from '@react-navigation/native';
 * import { createCurrentRouteContextHelper } from '@tambo-ai/react-native';
 *
 * function App() {
 *   const route = useRoute();
 *   const routeHelper = createCurrentRouteContextHelper(route);
 *
 *   return (
 *     <TamboProvider contextHelpers={{ currentRoute: routeHelper }}>
 *       <YourApp />
 *     </TamboProvider>
 *   );
 * }
 * ```
 */
export function createCurrentRouteContextHelper(route: {
  name: string;
  params?: Record<string, unknown>;
}): ContextHelperFn {
  return () => ({
    key: "currentRoute",
    value: {
      routeName: route.name,
      params: route.params,
    },
  });
}

/**
 * Standalone context helper that tries to get route from React Navigation
 * This is a placeholder - users should use createCurrentRouteContextHelper
 * with their own route object from React Navigation
 *
 * @returns null by default - users should provide their own implementation
 */
export const currentRouteContextHelper: ContextHelperFn = () => {
  // This is a placeholder - users should use createCurrentRouteContextHelper
  // with their React Navigation route
  return null;
};
